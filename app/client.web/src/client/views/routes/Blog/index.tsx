import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
import { RouteConf } from "@client/views/conf.routes";
import { Blog } from "./component";
import { Omit } from "utility-types";
import { RouteComponentProps } from "react-router";

export type LocalProps = WithTranslation &
  RouteComponentProps &
  Omit<RouteConf, "component"> & {
    routes: RouteConf[];
  };

export default withTranslation(Blog.i18nNamespace)(Blog);
