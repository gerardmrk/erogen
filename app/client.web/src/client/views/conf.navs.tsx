export type NavConf = {
  label: string;
  to: string;
  external?: boolean;
  icon?: React.ReactElement;
};

export const headerNavsPrivate = [
  {
    label: "navs.private.dashboard",
    to: "/",
  },
];

export const authNavs = [
  {
    label: "navs.login",
    to: "/login",
  },
  {
    label: "navs.register",
    to: "/register",
  },
  {
    label: "navs.forgot-password",
    to: "/forgot-password",
  },
];
