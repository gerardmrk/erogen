import { withTranslation, WithTranslation } from "react-i18next";
import { RouteConf } from "@client/views/conf.routes";
import { Blog } from "./component";
import { Omit } from "utility-types";

export type LocalProps = WithTranslation &
  Omit<RouteConf, "component"> & {
    routes: RouteConf[];
  };

export default withTranslation("route_Blog")(Blog);
