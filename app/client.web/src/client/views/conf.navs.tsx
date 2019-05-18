export type NavConf = {
  label: string;
  to: string;
  external?: boolean;
  icon?: React.ReactElement;
};

export const headerNavsPublic = [
  {
    label: "Product",
    to: "/about/product",
  },
  {
    label: "Blog",
    to: "/blog",
  },
  {
    label: "Docs",
    to: "/documentation",
  },
  {
    label: "Support",
    to: "/support",
  },
];

export const headerNavsPrivate = [
  {
    label: "Dashboard",
    to: "/",
  },
];

export const authNavs = [
  {
    label: "Login",
    to: "/login",
  },
  {
    label: "Register",
    to: "/register",
  },
  {
    label: "Reset Password",
    to: "/reset-password",
  },
];
