import {
  productPage,
  blogPage,
  documentationPage,
  supportPage,
  dashboardPage,
  homeFeedPage,
  registerPage,
  loginPage,
  resetPasswordPage,
} from "@client/views/conf.routes";

export type NavConf = {
  label: string;
  to: string;
  external?: boolean;
  icon?: React.ReactElement;
};

export const headerNavsPublic = [
  {
    label: "Product",
    to: productPage.path,
  },
  {
    label: "Blog",
    to: blogPage.path,
  },
  {
    label: "Docs",
    to: documentationPage.path,
  },
  {
    label: "Support",
    to: supportPage.path,
  },
];

export const headerNavsPrivate = [
  {
    label: "Home",
    to: homeFeedPage.path,
  },
  {
    label: "Dashboard",
    to: dashboardPage.path,
  },
];

export const authNavs = [
  {
    label: "Login",
    to: loginPage.path,
  },
  {
    label: "Register",
    to: registerPage.path,
  },
  {
    label: "Reset Password",
    to: resetPasswordPage.path,
  },
];
