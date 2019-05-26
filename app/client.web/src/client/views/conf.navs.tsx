export type NavConf = {
  label: string;
  to: string;
  external?: boolean;
  icon?: React.ReactElement;
};

export const headerNavsPublic = [
  {
    label: "navs.public.product",
    to: "/about/product",
  },
  {
    label: "navs.public.blog",
    to: "/blog",
  },
  {
    label: "navs.public.docs",
    to: "/documentation",
  },
  {
    label: "navs.public.support",
    to: "/support",
  },
];

export const headerNavsPrivate = [
  {
    label: "navs.private.dashboard",
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
