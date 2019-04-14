import * as React from "react";

export type RouteConf = {
  title: TranslationKey;
  path: string;
  guarded: boolean;
  exact?: boolean;
  strict?: boolean;
  component: React.LazyExoticComponent<any>;
  routes?: RouteConf[];
};

export const DEFAULT_PUBLIC_PATH = "/";
export const DEFAULT_PRIVATE_PATH = "/:user/dashboard";
export const DEFAULT_LOGIN_PATH = "/auth/login";

export const landingPage = {
  title: "Landing",
  path: DEFAULT_PUBLIC_PATH,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Landing")),
};

export const routeConfs: RouteConf[] = [landingPage];
export default routeConfs;
