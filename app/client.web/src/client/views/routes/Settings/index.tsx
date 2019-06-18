import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
import { Settings } from "./component";
import { RouteConf } from "@client/views/conf.routes";
import { Omit } from "utility-types";

export type LocalProps = WithTranslation &
  Omit<RouteConf, "component"> & {
    routes: RouteConf[];
  };

export default withTranslation(Settings.i18nNamespace)(Settings);
