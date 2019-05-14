import { Http2ServerRequest, Http2ServerResponse } from "http2";
import { RequestHandler } from "fastify";
import { Renderer } from "../../../dist/renderer";

export type Router = RequestHandler<Http2ServerRequest, Http2ServerResponse>;

export const initRouter = async (): Promise<Router> => {
  const renderer = new Renderer({ debug: true });

  await renderer.init({
    cache: true,
    prerender: { lang: "en", all: true },
    internationalization: {
      debug: false,
      translations: "../../dist/client/i18n/translations",
    },
  });

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
