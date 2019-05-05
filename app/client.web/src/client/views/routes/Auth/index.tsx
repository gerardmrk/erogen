import { withTranslation, WithTranslation } from "react-i18next";
import { RouteConf } from "@client/views/conf.routes";
import { Auth } from "./component";

export type LocalProps = RouteConf & WithTranslation & {};

export default withTranslation("route_Auth")(Auth);
