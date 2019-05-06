import { withTranslation, WithTranslation } from "react-i18next";
import { RouteConf } from "@client/views/conf.routes";
import { BlogPost } from "./component";
import { Omit } from "utility-types";

export type LocalProps = WithTranslation & Omit<RouteConf, "component"> & {};

export default withTranslation("route_BlogPost")(BlogPost);
