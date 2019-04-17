import * as React from "react";

export type RouteConf = {
  status?: number;
  title: TranslationKey;
  path?: string;
  guarded: boolean;
  exact?: boolean;
  strict?: boolean;
  component: React.LazyExoticComponent<any>;
  routes?: RouteConf[];
};

export const DEFAULT_PUBLIC_PATH = "/";
export const DEFAULT_PRIVATE_PATH = "/dashboard";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";

export const landingPage = {
  title: "Landing",
  path: DEFAULT_PUBLIC_PATH,
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Landing")),
};

export const productPage = {
  title: "Product",
  path: "/about/product",
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Product")),
};

export const blogPostPage = {
  title: "Blog",
  path: "/blog/:post",
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Blog/BlogPost")),
};

export const blogPage = {
  title: "Blog",
  path: "/blog",
  exact: false,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Blog")),
  routes: [blogPostPage],
};

export const documentationPage = {
  title: "Documentation",
  path: "/documentation",
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Documentation")),
};

export const supportPage = {
  title: "Support",
  path: "/support",
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Support")),
};

export const loginPage = {
  title: "Login",
  path: LOGIN_PATH,
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Login")),
};

export const registerPage = {
  title: "Register",
  path: REGISTER_PATH,
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Register")),
};

export const forgotPasswordPage = {
  title: "Forgot Password",
  path: "/forgot-password",
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/ForgotPassword")),
};

export const resetPasswordPage = {
  title: "Reset Password",
  path: "/reset-password",
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/ResetPassword")),
};

export const authPage = {
  title: "Auth",
  path: "/auth",
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Auth")),
};

export const homeFeedPage = {
  title: "Home Feed",
  path: "/feed",
  exact: true,
  guarded: true,
  component: React.lazy(() => import("@client/views/routes/HomeFeed")),
};

export const dashboardPage = {
  title: "Dashboard",
  path: DEFAULT_PRIVATE_PATH,
  exact: true,
  guarded: true,
  component: React.lazy(() => import("@client/views/routes/Dashboard")),
};

export const accountSettingsPage = {
  title: "Account Settings",
  path: "/settings/account",
  exact: true,
  guarded: true,
  component: React.lazy(() =>
    import("@client/views/routes/Settings/AccountSettings"),
  ),
};

export const profileSettingsPage = {
  title: "Profile Settings",
  path: "/settings/profile",
  exact: true,
  guarded: true,
  component: React.lazy(() =>
    import("@client/views/routes/Settings/ProfileSettings"),
  ),
};

export const settingsPage = {
  title: "Settings",
  path: "/settings",
  exact: false,
  guarded: true,
  component: React.lazy(() => import("@client/views/routes/Settings")),
  routes: [profileSettingsPage, accountSettingsPage],
};

export const maintenancePage = {
  title: "Maintenance Mode",
  path: "/maintenance",
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Maintenance")),
};

export const profilePage = {
  title: "Profile",
  path: "/user/:user",
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Profile")),
};

export const serverErrorPage = {
  status: 500,
  title: "500 Server Error",
  path: "/500",
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/ServerError")),
};

export const notFoundPage = {
  status: 404,
  title: "404 Not Found",
  exact: false,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/NotFound")),
};

export const routeConfs: RouteConf[] = [
  landingPage,
  productPage,
  blogPage,
  documentationPage,
  supportPage,
  loginPage,
  registerPage,
  forgotPasswordPage,
  resetPasswordPage,
  authPage,
  dashboardPage,
  homeFeedPage,
  settingsPage,
  profilePage,
  serverErrorPage,
  notFoundPage,
];
export default routeConfs;
