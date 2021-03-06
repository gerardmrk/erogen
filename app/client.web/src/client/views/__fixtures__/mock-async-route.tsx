import loadable from "@loadable/component";
import { RouteConf } from "../conf.routes";

export const mockAsyncRoute: RouteConf = {
  path: "/mock",
  exact: true,
  guarded: false,
  prerender: true,
  component: loadable(() => import("@client/views/__fixtures__/mock-component")),
};
