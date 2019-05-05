import { Auth } from "./component";
import { withTranslation, WithTranslation } from "react-i18next";
import { RouteConf } from "@client/views/conf.routes";

export type LocalProps = RouteConf & WithTranslation & {};

export default withTranslation(Auth.i18nNamespace)(Auth);
