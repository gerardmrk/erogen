/**
 * Routes config
 */

import { default as loadable, LoadableComponent } from "@loadable/component";

export type RouteConf<P = any> = {
  // route's title; used in the <title> tag and other title-related meta tags.
  title?: TranslationKey;
  // route's description; used in the <description> tag and other desc-related meta tags.
  description?: TranslationKey;
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

export const LOGIN_PATH = "/login";
export const DEFAULT_PUBLIC_PATH = "/";
export const DEFAULT_PRIVATE_PATH = "/dashboard";

/**
 * IMPORTANT RULES:
 * - only the last route is allowed to have a non-specified path.
 * - the last route is reserved for the 404 route.
 */

// prettier-ignore
export const routeConfs: RouteConf[] = [
  {
    title: "routes/Login.head_title",
    description: "routes/Login.head_description",
    path: "/login",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Login")),
  },
  {
    title: "routes/Landing.head_title",
    description: "routes/Landing.head_description",
    path: DEFAULT_PUBLIC_PATH,
    exact: true,
    guarded: false,
    prerender: true,
    defaultPublicRoute: true,
    component: loadable(() => import("@client/views/routes/Landing")),
  },
  {
    title: "routes/Product.head_title",
    description: "routes/Product.head_description",
    path: "/about/product",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Product")),
  },
  {
    title: "routes/Blog.head_title",
    description: "routes/Blog.head_description",
    path: "/blog",
    exact: false,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Blog")),
    routes: [
      {
        title: "routes/Blog/BlogPost.head_title",
        description: "routes/Blog/BlogPost.head_description",
        path: "/blog/:post",
        exact: true,
        guarded: false,
        prerender: false,
        component: loadable(() => import("@client/views/routes/Blog/BlogPost")),
      },
    ],
  },
  {
    title: "routes/Documentation.head_title",
    description: "routes/Documentation.head_description",
    path: "/documentation",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Documentation")),
  },
  {
    title: "routes/Support.head_title",
    description: "routes/Support.head_description",
    path: "/support",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Support")),
  },
  {
    title: "routes/Register.head_title",
    description: "routes/Register.head_description",
    path: "/register",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Register")),
  },
  {
    title: "routes/ForgotPassword.head_title",
    description: "routes/ForgotPassword.head_description",
    path: "/forgot-password",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/ForgotPassword")),
  },
  {
    title: "routes/ResetPassword.head_title",
    description: "routes/ResetPassword.head_description",
    path: "/reset-password",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/ResetPassword")),
  },
  {
    title: "routes/Auth.head_title",
    description: "routes/Auth.head_description",
    path: "/auth",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Auth")),
  },
  {
    title: "routes/Dashboard.head_title",
    description: "routes/Dashboard.head_description",
    path: DEFAULT_PRIVATE_PATH,
    exact: true,
    guarded: true,
    prerender: false,
    component: loadable(() => import("@client/views/routes/Dashboard")),
  },
  {
    title: "routes/HomeFeed.head_title",
    description: "routes/HomeFeed.head_description",
    path: "/feed",
    exact: true,
    guarded: true,
    prerender: false,
    component: loadable(() => import("@client/views/routes/HomeFeed")),
  },
  {
    title: "routes/Settings.head_title",
    description: "routes/Settings.head_description",
    path: "/settings",
    exact: false,
    guarded: true,
    prerender: false,
    component: loadable(() => import("@client/views/routes/Settings")),
    routes: [
      {
        title: "routes/Settings/ProfileSettings.head_title",
        description: "routes/Settings/ProfileSettings.head_description",
        path: "/settings/profile",
        exact: true,
        guarded: true,
        prerender: false,
        component: loadable(() => import("@client/views/routes/Settings/ProfileSettings")),
      },
      {
        title: "routes/Settings/AccountSettings.head_title",
        description: "routes/Settings/AccountSettings.head_description",
        path: "/settings/account",
        exact: true,
        guarded: true,
        prerender: false,
        component: loadable(() => import("@client/views/routes/Settings/AccountSettings")),
      },
      {
        title: "routes/Settings/BillingSettings.head_title",
        description: "routes/Settings/BillingSettings.head_description",
        path: "/settings/billing",
        exact: true,
        guarded: true,
        prerender: false,
        component: loadable(() => import("@client/views/routes/Settings/BillingSettings")),
      },
    ],
  },
  {
    title: "routes/Maintenance.head_title",
    description: "routes/Maintenance.head_description",
    path: "/maintenance",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Maintenance")),
  },
  {
    title: "routes/Profile.head_title",
    description: "routes/Profile.head_description",
    path: "/user/:user",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Profile")),
  },
  {
    status: 500,
    title: "routes/ServerError.head_title",
    description: "routes/ServerError.head_description",
    path: "/500",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/ServerError")),
  },
  {
    status: 404,
    title: "routes/NotFound.head_title",
    description: "routes/NotFound.head_description",
    exact: false,
    guarded: false,
    prerender: true,
    notFoundRoute: true,
    component: loadable(() => import("@client/views/routes/NotFound")),
  },
];
