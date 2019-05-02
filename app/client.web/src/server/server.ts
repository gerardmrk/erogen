import { Http2SecureServer, Http2ServerRequest, Http2ServerResponse } from 'http2'; // prettier-ignore
import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"; // prettier-ignore
// import securityHeaders from "fastify-helmet";
import { initRouter } from "./router";
import { registerLifecycleHooks } from "./hooks";

export type Server = FastifyInstance<
  Http2SecureServer,
  Http2ServerRequest,
  Http2ServerResponse
>;
export type ServerRequest = FastifyRequest<Http2ServerRequest>;
export type ServerResponse = FastifyReply<Http2ServerResponse>;

export type ServerConfig = {
  port: number;
  host: string;
  assets: StaticAssetsConfig;
};

export type StaticAssetsConfig = {
  rootDir: string;
  urlPrefix: string;
  gzip?: boolean;
  brotli?: boolean;
  preferBrotli?: boolean;
};

export const initServer = async (conf: ServerConfig): Promise<Server> => {
  const srv: Server = fastify({
    http2: true,
    https: {
      allowHTTP1: true,
    },
    logger: { prettyPrint: true },
  });

  // register lifecycle hooks
  // https://www.fastify.io/docs/latest/Hooks/
  await registerLifecycleHooks(srv, conf);

  // enables better security with various HTTP header settings
  // https://helmetjs.github.io/
  // srv.register(securityHeaders);

  srv.route({
    url: "*",
    method: ["GET", "HEAD", "OPTIONS"],
    handler: await initRouter(),
  });

  return srv;
};
