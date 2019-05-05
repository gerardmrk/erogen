import { WithTranslation, withTranslation } from "react-i18next";
import { Register } from "./component";
import { RouteConf } from "@client/views/conf.routes";

export type LocalProps = WithTranslation & RouteConf & {};

export default withTranslation("route_Register")(Register);
