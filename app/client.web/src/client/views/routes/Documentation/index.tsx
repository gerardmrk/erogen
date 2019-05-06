import { WithTranslation, withTranslation } from "react-i18next";
import { RouteConf } from "@client/views/conf.routes";
import { Documentation } from "./component";
import { Omit } from "utility-types";

export type LocalProps = WithTranslation & Omit<RouteConf, "component"> & {};

export default withTranslation("route_Documentation")(Documentation);
