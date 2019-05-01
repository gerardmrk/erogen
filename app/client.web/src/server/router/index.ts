import { RequestHandler } from "fastify";
import {
  IncomingMessage as HTTPRequest,
  ServerResponse as HTTPResponse,
} from "http";
import { Renderer } from "../../../dist/renderer";

export type Router = RequestHandler<HTTPRequest, HTTPResponse>;

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
