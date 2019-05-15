import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
import { RouteConf } from "@client/views/conf.routes";
import { Login } from "./component";
import { Omit } from "utility-types";

export type LocalProps = WithTranslation & Omit<RouteConf, "component"> & {};
export default withTranslation(Login.i18nNamespace)(Login);
