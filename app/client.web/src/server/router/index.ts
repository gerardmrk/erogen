import { Http2ServerRequest, Http2ServerResponse } from "http2";
import { RequestHandler } from "fastify";
import { Renderer } from "../../../dist/renderer";

export type Router = RequestHandler<Http2ServerRequest, Http2ServerResponse>;

export const initRouter = async (): Promise<Router> => {
  const renderer = new Renderer({ cache: true });
  await renderer.prerenderRoutes({ lang: "en", all: true });

  return async (req, res) => {
    const html = await renderer.getRouteHTML({
      url: req.req.url || "/",
      lang: "en",
    });

    res.header("Content-Type", "text/html");
    res.header("Content-Length", html.length);
    res.send(html);
  };
};
