import "source-map-support/register";
import {
  renderEngine,
  RenderRequest,
  RenderResponse,
} from "./engine/render-engine";
import { RendererRequest, RendererResponse } from "./proto";
import {
  streamEngine,
  StreamRequest,
  StreamResponse,
  StreamMetaData,
} from "./engine/stream-engine";

const createInitialResponseObject = (): RenderResponse => ({
  statusCode: 200,
  redirectTo: "",
  error: null,
  ttr: "",
  metas: undefined,
  app: undefined,
  links: undefined,
  styles: undefined,
  scripts: undefined,
  initialState: undefined,
});

export type RenderJsonFn = (request: RenderRequest) => RenderResponse;
export type RenderProtoFn = (input: Uint8Array) => Uint8Array;
export type StreamHtmlFn = (request: StreamRequest, response: StreamResponse, metaData: StreamMetaData) => void; // prettier-ignore

export type RendererOrStreamer<FN> = (stats: AsyncModuleStats) => FN;

// -------------------------------------------------------------------------------------------------
// Render JSON
// -------------------------------------------------------------------------------------------------
// prettier-ignore
export const jsonRenderer: RendererOrStreamer<RenderJsonFn> = (stats: AsyncModuleStats) => {
  const render = renderEngine(stats);

  return (request: RenderRequest): RenderResponse => {
    const timerStart = process.hrtime.bigint();
    const response: RenderResponse = createInitialResponseObject();

    render(request, response);
    response.ttr = `${process.hrtime.bigint() - timerStart}ns`; // TODO: change when protobufjs sets bigint for uint64
    return response;
  };
};

// -------------------------------------------------------------------------------------------------
// Render Protobuf
// -------------------------------------------------------------------------------------------------

// prettier-ignore
export const protoRenderer: RendererOrStreamer<RenderProtoFn> = (stats: AsyncModuleStats) => {
  const render = renderEngine(stats);
  const textEncoder = new TextEncoder();

  return (input: Uint8Array): Uint8Array => {
    const timerStart = process.hrtime.bigint();
    const output: RenderResponse = createInitialResponseObject();

    render(RendererRequest.decode(input), output);
    const response = RendererResponse.create({
      statusCode: output.statusCode,
      redirectTo: output.redirectTo,
      error: output.error,
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

// prettier-ignore
export const htmlStreamer: RendererOrStreamer<StreamHtmlFn> = (stats: AsyncModuleStats) => {
  const stream = streamEngine(stats);

  return (request: StreamRequest, response: StreamResponse, metaData: StreamMetaData) => {
    stream(request, response, metaData);
  };
};
