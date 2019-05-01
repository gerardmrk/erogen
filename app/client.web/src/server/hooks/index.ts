/**
 * Request lifecycle event hooks.
 *
 * hooks -> https://www.fastify.io/docs/latest/Hooks/
 * lifecycle -> https://www.fastify.io/docs/latest/Lifecycle/
 */
import { Server, ServerConfig } from "@server/server";

import forOnRequest from "./on-request";
import forPreParsing from "./pre-parsing";
import forPreValidation from "./pre-validation";
import forPreHandler from "./pre-handler";
import forPreSerialization from "./pre-serialization";
import forOnSend from "./on-send";
import forOnResponse from "./on-response";
import forOnError from "./on-error";

export const registerLifecycleHooks = async (
  srv: Server,
  conf: ServerConfig,
) => {
  await Promise.all(
    [
      forOnRequest,
      forPreParsing,
      forPreValidation,
      forPreHandler,
      forPreSerialization,
      forOnSend,
      forOnResponse,
      forOnError,
    ].map(addHooks => addHooks(srv, conf)),
  );
};
