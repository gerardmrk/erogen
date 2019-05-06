import { WithTranslation, withTranslation } from "react-i18next";
import { Product } from "./component";
import { RouteConf } from "@client/views/conf.routes";
import { Omit } from "utility-types";

export type LocalProps = WithTranslation & Omit<RouteConf, "component"> & {};

export default withTranslation("route_Product")(Product);
