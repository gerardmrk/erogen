import { FastifyRequest, FastifyReply } from "fastify";
import { IncomingMessage, ServerResponse } from "http";

type SrvRequest = IncomingMessage &
  FastifyRequest<IncomingMessage> & {
    acceptedMimeTypes: string[];
    acceptedCharsets: string[];
    acceptedEncodings: string[];
    acceptedLanguages: string[];
  };

type SrvResponse = ServerResponse & FastifyReply<ServerResponse>;
