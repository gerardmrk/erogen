import {
  Server as HTTPServer,
  IncomingMessage as HTTPRequest,
  ServerResponse as HTTPResponse,
} from "http";
import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import staticServer from "fastify-static";
import securityHeaders from "fastify-helmet";
import { initRouter } from "./router";
import { registerLifecycleHooks } from "./hooks";

export type Server = FastifyInstance<HTTPServer, HTTPRequest, HTTPResponse>;
export type ServerRequest = FastifyRequest<HTTPRequest>;
export type ServerResponse = FastifyReply<HTTPResponse>;

export type ServerConfig = {
  port: number;
  host: string;
  assetsDir: string;
  assetsUrlPrefix: string;
};

export const initServer = async (conf: ServerConfig): Promise<Server> => {
  const srv: Server = fastify({ logger: { prettyPrint: true } });

  // register lifecycle hooks
  // https://www.fastify.io/docs/latest/Hooks/
  await registerLifecycleHooks(srv, conf);

  // enables better security with various HTTP header settings
  // https://helmetjs.github.io/
  srv.register(securityHeaders);

  // static file server middleware
  // https://github.com/fastify/fastify-static
  srv.register(staticServer, {
    root: conf.assetsDir,
    prefix: conf.assetsUrlPrefix,
  });

  srv.route({
    url: "*",
    method: ["GET", "HEAD", "OPTIONS"],
    handler: await initRouter(),
  });

  return srv;
};
