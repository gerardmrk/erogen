/**
 * Routes config
 */

import loadable, { LoadableComponent } from "@loadable/component";

export type RouteConf<P = any> = {
  // route's designated OpenGraph type (og:type); used in the og:type meta tag.
  metaType?: string;
  // route's primary image; used in various image-related meta tags.
  metaImgPath?: string;
  // route's primary image alt; used in various image-alt-related meta tags.
  metaImgAlt?: string;
  // route's twitter card type; used in the twitter:card meta tag.
  metaTwitterCardType?: "summary" | "summary_large_image" | "app" | "player";
  // [React Router] whether the path must be an exact match.
  exact?: boolean;
  // [React Router] whether to account for the paths trailing slash.
  strict?: boolean;
  // default HTTP status code for the route.
  status?: number;
  // relative route path.
  path?: string;
  // whether this route requires authentication to be accessed.
  guarded: boolean;
  // whether to prerender this route.
  prerender?: boolean;
  // the lazy-loaded route component.
  component: LoadableComponent<P>;
  // nested children routes.
  routes?: RouteConf[];
  // internal: whether this is the default public page.
  defaultPublicRoute?: boolean;
  // internal: whether this is the default 404 page.
  notFoundRoute?: boolean;
};

export const ROUTE_CHUNK_NAME_PREFIX = "client-views-routes-";

/**
 * IMPORTANT RULES:
 * - only the last route is allowed to have a non-specified path.
 * - the last route is reserved for the 404 route.
 */

// prettier-ignore
export const routeConfs: RouteConf[] = [
  {
    path: "/login",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Login")),
  },
  {
    path: "/",
    exact: true,
    guarded: false,
    prerender: true,
    defaultPublicRoute: true,
    component: loadable(() => import("@client/views/routes/Home")),
  },
  {
    path: "/dashboard",
    exact: true,
    guarded: true,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Dashboard")),
  },
  {
    path: "/about/product",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Product")),
  },
  {
    path: "/blog",
    exact: false,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Blog")),
    routes: [
      {
        path: "/blog/:post",
        exact: true,
        guarded: false,
        prerender: false,
        component: loadable(() => import("@client/views/routes/BlogPost")),
      },
    ],
  },
  {
    path: "/documentation",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Documentation")),
  },
  {
    path: "/support",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Support")),
  },
  {
    path: "/register",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Register")),
  },
  {
    path: "/forgot-password",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/ForgotPassword")),
  },
  {
    path: "/reset-password",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/ResetPassword")),
  },
  {
    path: "/auth",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Auth")),
  },
  {
    path: "/settings",
    exact: false,
    guarded: true,
    prerender: false,
    component: loadable(() => import("@client/views/routes/Settings")),
    routes: [
      {
        path: "/settings/profile",
        exact: true,
        guarded: true,
        prerender: false,
        component: loadable(() => import("@client/views/routes/SettingsProfile")),
      },
      {
        path: "/settings/account",
        exact: true,
        guarded: true,
        prerender: false,
        component: loadable(() => import("@client/views/routes/SettingsAccount")),
      },
      {
        path: "/settings/billing",
        exact: true,
        guarded: true,
        prerender: false,
        component: loadable(() => import("@client/views/routes/SettingsBilling")),
      },
    ],
  },
  {
    path: "/maintenance",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Maintenance")),
  },
  {
    path: "/user/:user",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Profile")),
  },
  {
    status: 500,
    path: "/500",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/ServerError")),
  },
  {
    status: 404,
    exact: false,
    guarded: false,
    prerender: true,
    notFoundRoute: true,
    component: loadable(() => import("@client/views/routes/NotFound")),
  },
];
