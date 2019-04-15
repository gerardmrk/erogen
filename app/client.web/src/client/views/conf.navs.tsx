import {
  productPage,
  blogPage,
  documentationPage,
  supportPage,
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

export const headerNavsPrivate = [];

export const authNavs = [];
