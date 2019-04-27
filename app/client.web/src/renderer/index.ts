import "source-map-support/register";
import { RendererRequest, RendererResponse } from "./proto";
import { renderEngine, RenderRequest, RenderResponse } from "./engine/render-engine"; // prettier-ignore
import { streamEngine, StreamRequest, StreamResponse, StreamMetaData } from "./engine/stream-engine"; // prettier-ignore

const createInitialResponseObject = (): RenderResponse => ({
  statusCode: 200,
  redirectTo: "",
  error: null,
  ttr: "",
  lang: undefined,
  metas: undefined,
  app: undefined,
  links: undefined,
  styles: undefined,
  scripts: undefined,
  initialState: undefined,
});

export type RenderJsonFn = (request: RenderRequest) => Promise<RenderResponse>;
export type RenderProtoFn = (input: Uint8Array) => Promise<Uint8Array>;
export type StreamHtmlFn = (request: StreamRequest, response: StreamResponse, metaData: StreamMetaData) => Promise<void>; // prettier-ignore

export type RendererOrStreamer<FN> = () => FN;

// -------------------------------------------------------------------------------------------------
// Render JSON
// -------------------------------------------------------------------------------------------------
export const jsonRenderer: RendererOrStreamer<RenderJsonFn> = () => {
  const render = renderEngine();

  return async (request: RenderRequest): Promise<RenderResponse> => {
    const timerStart = process.hrtime.bigint();
    const response: RenderResponse = createInitialResponseObject();

    await render(request, response);
    response.ttr = `${process.hrtime.bigint() - timerStart}ns`; // TODO: change when protobufjs sets bigint for uint64
    return response;
  };
};

// -------------------------------------------------------------------------------------------------
// Render Protobuf
// -------------------------------------------------------------------------------------------------
export const protoRenderer: RendererOrStreamer<RenderProtoFn> = () => {
  const render = renderEngine();
  const textEncoder = new TextEncoder();

  return async (input: Uint8Array): Promise<Uint8Array> => {
    const timerStart = process.hrtime.bigint();
    const output: RenderResponse = createInitialResponseObject();

    await render(RendererRequest.decode(input), output);
    const response = RendererResponse.create({
      statusCode: output.statusCode,
      redirectTo: output.redirectTo,
      error: output.error,
      lang: output.lang,
      metas: textEncoder.encode(output.metas),
      app: textEncoder.encode(output.app),
      links: textEncoder.encode(output.links),
      styles: textEncoder.encode(output.styles),
      scripts: textEncoder.encode(output.scripts),
      initialState: textEncoder.encode(output.initialState),
    });
    response.ttr = `${process.hrtime.bigint() - timerStart}ns`; // TODO: change when protobufjs sets bigint for uint64
    return RendererResponse.encode(response).finish();
  };
};

// -------------------------------------------------------------------------------------------------
// Stream HTML
// -------------------------------------------------------------------------------------------------
export const htmlStreamer: RendererOrStreamer<StreamHtmlFn> = () => {
  const stream = streamEngine();

  return async (
    request: StreamRequest,
    response: StreamResponse,
    metaData: StreamMetaData,
  ) => {
    await stream(request, response, metaData);
  };
};
