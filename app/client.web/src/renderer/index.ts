import "source-map-support/register";
import {
  renderEngine,
  RenderRequest,
  RenderResponse,
} from "./engine/render-engine";
import { RendererRequest, RendererResponse } from "./proto";

export const renderJSON = (stats: AsyncModuleStats) => {
  const render = renderEngine(stats);

  return async (request: RenderRequest): Promise<RenderResponse> => {
    const timerStart = process.hrtime.bigint();

    const response: RenderResponse = {
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
    };

    await render(request, response);
    response.ttr = `${process.hrtime.bigint() - timerStart}ns`; // TODO: change when protobufjs sets bigint for uint64
    return response;
  };
};

export const renderProto = (stats: AsyncModuleStats) => {
  const render = renderEngine(stats);
  const textEncoder = new TextEncoder();

  return async (input: Uint8Array): Promise<Uint8Array> => {
    const timerStart = process.hrtime.bigint();

    const output: RenderResponse = {
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
    };

    await render(RendererRequest.decode(input), output);
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
