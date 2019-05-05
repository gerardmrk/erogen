import { WithTranslation, withTranslation } from "react-i18next";
import { ResetPassword } from "./component";
import { RouteConf } from "@client/views/conf.routes";

export type LocalProps = WithTranslation & RouteConf & {};

export default withTranslation("route_ResetPassword")(ResetPassword);
