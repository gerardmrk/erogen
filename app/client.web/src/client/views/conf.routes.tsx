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
};

export const LOGIN_PATH = "/login";
export const DEFAULT_PUBLIC_PATH = "/";
export const DEFAULT_PRIVATE_PATH = "/dashboard";

// prettier-ignore
export const routeConfs: RouteConf[] = [
  {
    title: "Login",
    description: "Login to the app",
    path: "/login",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Login")),
  },
  {
    path: DEFAULT_PUBLIC_PATH,
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Landing")),
  },
  {
    title: "Product",
    path: "/about/product",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Product")),
  },
  {
    title: "Blog",
    path: "/blog",
    exact: false,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Blog")),
    routes: [
      {
        title: "Blog",
        path: "/blog/:post",
        exact: true,
        guarded: false,
        prerender: false,
        component: loadable(() => import("@client/views/routes/Blog/BlogPost")),
      },
    ],
  },
  {
    title: "Documentation",
    path: "/documentation",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Documentation")),
  },
  {
    title: "Support",
    path: "/support",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Support")),
  },
  {
    title: "Register",
    path: "/register",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Register")),
  },
  {
    title: "Forgot Password",
    path: "/forgot-password",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/ForgotPassword")),
  },
  {
    title: "Reset Password",
    path: "/reset-password",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/ResetPassword")),
  },
  {
    title: "Auth",
    path: "/auth",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Auth")),
  },
  {
    title: "Dashboard",
    path: DEFAULT_PRIVATE_PATH,
    exact: true,
    guarded: true,
    prerender: false,
    component: loadable(() => import("@client/views/routes/Dashboard")),
  },
  {
    title: "Home Feed",
    path: "/feed",
    exact: true,
    guarded: true,
    prerender: false,
    component: loadable(() => import("@client/views/routes/HomeFeed")),
  },
  {
    title: "Settings",
    path: "/settings",
    exact: false,
    guarded: true,
    prerender: false,
    component: loadable(() => import("@client/views/routes/Settings")),
    routes: [
      {
        title: "Profile Settings",
        path: "/settings/profile",
        exact: true,
        guarded: true,
        prerender: false,
        component: loadable(() => import("@client/views/routes/Settings/ProfileSettings")),
      },
      {
        title: "Account Settings",
        path: "/settings/account",
        exact: true,
        guarded: true,
        prerender: false,
        component: loadable(() => import("@client/views/routes/Settings/AccountSettings")),
      },
    ],
  },
  {
    title: "Maintenance Mode",
    path: "/maintenance",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Maintenance")),
  },
  {
    title: "Profile",
    path: "/user/:user",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/Profile")),
  },
  {
    status: 500,
    title: "500 Server Error",
    path: "/500",
    exact: true,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/ServerError")),
  },
  {
    status: 404,
    title: "404 Not Found",
    exact: false,
    guarded: false,
    prerender: true,
    component: loadable(() => import("@client/views/routes/NotFound")),
  },
];
