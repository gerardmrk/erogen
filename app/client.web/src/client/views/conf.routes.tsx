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
export const DEFAULT_AUTH_PATH = "/login";

export const landingPage = {
  title: "Landing",
  path: DEFAULT_PUBLIC_PATH,
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Landing")),
};

export const loginPage = {
  title: "Login",
  path: DEFAULT_AUTH_PATH,
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Login")),
};

export const registerPage = {
  title: "Register",
  path: "/register",
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

export const profilePage = {
  title: "Profile",
  path: "/:user",
  exact: true,
  guarded: false,
  component: React.lazy(() => import("@client/views/routes/Profile")),
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
  exact: true,
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
  loginPage,
  registerPage,
  forgotPasswordPage,
  resetPasswordPage,
  authPage,
  profilePage,
  dashboardPage,
  homeFeedPage,
  settingsPage,
];
export default routeConfs;
