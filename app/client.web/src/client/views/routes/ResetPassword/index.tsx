import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
import { ResetPassword } from "./component";
import { RouteConf } from "@client/views/conf.routes";
import { Omit } from "utility-types";

export type LocalProps = WithTranslation & Omit<RouteConf, "component"> & {};

export default withTranslation(ResetPassword.i18nNamespace)(ResetPassword);
