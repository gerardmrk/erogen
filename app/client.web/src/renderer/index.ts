import { render, Request, Response } from "./engine";
import { RendererRequest, RendererResponse } from "./proto";

export const renderJSON = async (input: Request): Promise<Response> => {
  const timer = process.hrtime();
  const resp = await render(input);
  resp.ttr = process.hrtime(timer)[1] / (1000 * 1000);
  return resp;
};

export const renderProto = async (input: Uint8Array): Promise<Uint8Array> => {
  const timer = process.hrtime();
  const resp = await render(RendererRequest.decode(input));
  const response = RendererResponse.create({
    statusCode: resp.statusCode,
    redirectTo: resp.redirectTo,
    error: resp.error,
    renderedHtmlHead: new TextEncoder().encode(resp.renderedHtmlHead),
    renderedHtmlBody: new TextEncoder().encode(resp.renderedHtmlBody),
    renderedHtmlStyles: new TextEncoder().encode(resp.renderedHtmlStyles),
    renderedHtmlScripts: new TextEncoder().encode(resp.renderedHtmlScripts)
  });
  response.ttr = process.hrtime(timer)[1] / (1000 * 1000);
  return RendererResponse.encode(response).finish();
};
