import loadable, { LoadableComponent } from "@loadable/component";

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
  // the lazy-loaded route component.
  component: LoadableComponent<P>;
  // nested children routes.
  routes?: RouteConf[];
};

export const DEFAULT_PUBLIC_PATH = "/";
export const DEFAULT_PRIVATE_PATH = "/dashboard";

export const landingPage = {
  path: DEFAULT_PUBLIC_PATH,
  exact: true,
  guarded: false,
  component: loadable(() => import("@client/views/routes/Landing"))
};

export const productPage = {
  title: "Product",
  path: "/about/product",
  exact: true,
  guarded: false,
  component: loadable(() => import("@client/views/routes/Product"))
};

export const blogPostPage = {
  title: "Blog",
  path: "/blog/:post",
  exact: true,
  guarded: false,
  component: loadable(() => import("@client/views/routes/Blog/BlogPost"))
};

export const blogPage = {
  title: "Blog",
  path: "/blog",
  exact: false,
  guarded: false,
  component: loadable(() => import("@client/views/routes/Blog")),
  routes: [blogPostPage]
};

export const documentationPage = {
  title: "Documentation",
  path: "/documentation",
  exact: true,
  guarded: false,
  component: loadable(() => import("@client/views/routes/Documentation"))
};

export const supportPage = {
  title: "Support",
  path: "/support",
  exact: true,
  guarded: false,
  component: loadable(() => import("@client/views/routes/Support"))
};

export const loginPage = {
  title: "Login",
  description: "Login to the app",
  path: "/login",
  exact: true,
  guarded: false,
  component: loadable(() => import("@client/views/routes/Login"))
};

export const registerPage = {
  title: "Register",
  path: "/register",
  exact: true,
  guarded: false,
  component: loadable(() => import("@client/views/routes/Register"))
};

export const forgotPasswordPage = {
  title: "Forgot Password",
  path: "/forgot-password",
  exact: true,
  guarded: false,
  component: loadable(() => import("@client/views/routes/ForgotPassword"))
};

export const resetPasswordPage = {
  title: "Reset Password",
  path: "/reset-password",
  exact: true,
  guarded: false,
  component: loadable(() => import("@client/views/routes/ResetPassword"))
};

export const authPage = {
  title: "Auth",
  path: "/auth",
  exact: true,
  guarded: false,
  component: loadable(() => import("@client/views/routes/Auth"))
};

export const homeFeedPage = {
  title: "Home Feed",
  path: "/feed",
  exact: true,
  guarded: true,
  component: loadable(() => import("@client/views/routes/HomeFeed"))
};

export const dashboardPage = {
  title: "Dashboard",
  path: DEFAULT_PRIVATE_PATH,
  exact: true,
  guarded: true,
  component: loadable(() => import("@client/views/routes/Dashboard"))
};

export const accountSettingsPage = {
  title: "Account Settings",
  path: "/settings/account",
  exact: true,
  guarded: true,
  component: loadable(() =>
    import("@client/views/routes/Settings/AccountSettings")
  )
};

export const profileSettingsPage = {
  title: "Profile Settings",
  path: "/settings/profile",
  exact: true,
  guarded: true,
  component: loadable(() =>
    import("@client/views/routes/Settings/ProfileSettings")
  )
};

export const settingsPage = {
  title: "Settings",
  path: "/settings",
  exact: false,
  guarded: true,
  component: loadable(() => import("@client/views/routes/Settings")),
  routes: [profileSettingsPage, accountSettingsPage]
};

export const maintenancePage = {
  title: "Maintenance Mode",
  path: "/maintenance",
  exact: true,
  guarded: false,
  component: loadable(() => import("@client/views/routes/Maintenance"))
};

export const profilePage = {
  title: "Profile",
  path: "/user/:user",
  exact: true,
  guarded: false,
  component: loadable(() => import("@client/views/routes/Profile"))
};

export const serverErrorPage = {
  status: 500,
  title: "500 Server Error",
  path: "/500",
  exact: true,
  guarded: false,
  component: loadable(() => import("@client/views/routes/ServerError"))
};

export const notFoundPage = {
  status: 404,
  title: "404 Not Found",
  exact: false,
  guarded: false,
  component: loadable(() => import("@client/views/routes/NotFound"))
};

export const routeConfs: RouteConf[] = [
  loginPage,
  landingPage,
  productPage,
  blogPage,
  documentationPage,
  supportPage,
  registerPage,
  forgotPasswordPage,
  resetPasswordPage,
  authPage,
  dashboardPage,
  homeFeedPage,
  settingsPage,
  profilePage,
  serverErrorPage,
  notFoundPage
];
export default routeConfs;
