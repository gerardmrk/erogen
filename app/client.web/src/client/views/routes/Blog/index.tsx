import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
import { RouteConf } from "@client/views/conf.routes";
import { Blog } from "./component";
import { Omit } from "utility-types";

export type LocalProps = WithTranslation &
  Omit<RouteConf, "component"> & {
    routes: RouteConf[];
  };

export default withTranslation(Blog.i18nNamespace)(Blog);
