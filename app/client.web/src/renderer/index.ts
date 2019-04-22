import "source-map-support/register";
import { renderEngine, Request, Response } from "./engine";
import { RendererRequest, RendererResponse } from "./proto";

export const renderJSON = (stats: AsyncModuleStats) => {
  const render = renderEngine(stats);

  return async (input: Request): Promise<Response> => {
    const timerStart = process.hrtime.bigint();

    const resp = await render(input);
    resp.ttr = `${process.hrtime.bigint() - timerStart}ns`; // TODO: change when protobufjs sets bigint for uint64
    return resp;
  };
};

export const renderProto = (stats: AsyncModuleStats) => {
  const render = renderEngine(stats);
  const textEncoder = new TextEncoder();

  return async (input: Uint8Array): Promise<Uint8Array> => {
    const timerStart = process.hrtime.bigint();

    const resp = await render(RendererRequest.decode(input));
    const response = RendererResponse.create({
      statusCode: resp.statusCode,
      redirectTo: resp.redirectTo,
      error: resp.error,
      htmlHead: textEncoder.encode(resp.htmlHead),
      htmlBody: textEncoder.encode(resp.htmlBody),
      htmlLinks: textEncoder.encode(resp.htmlLinks),
      htmlStyles: textEncoder.encode(resp.htmlStyles),
      htmlScripts: textEncoder.encode(resp.htmlScripts)
    });

    response.ttr = `${process.hrtime.bigint() - timerStart}ns`; // TODO: change when protobufjs sets bigint for uint64
    return RendererResponse.encode(response).finish();
  };
};
