import { withTranslation, WithTranslation } from "react-i18next";
import { Landing } from "./component";
import { RouteConf } from "@client/views/conf.routes";

export type LocalProps = WithTranslation & RouteConf & {};

export default withTranslation("route_Landing")(Landing);
