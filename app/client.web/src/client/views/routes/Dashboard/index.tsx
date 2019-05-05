import { WithTranslation, withTranslation } from "react-i18next";
import { RouteConf } from "@client/views/conf.routes";
import { Dashboard } from "./component";

export type LocalProps = WithTranslation & RouteConf & {};

export default withTranslation("route_Dashboard")(Dashboard);
