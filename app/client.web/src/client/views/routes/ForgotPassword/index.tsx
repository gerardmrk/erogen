import { WithTranslation, withTranslation } from "react-i18next";
import { RouteConf } from "@client/views/conf.routes";
import { ForgotPassword } from "./component";
import { Omit } from "utility-types";

export type LocalProps = WithTranslation & Omit<RouteConf, "component"> & {};

export default withTranslation(ForgotPassword.i18nNamespace)(ForgotPassword);
