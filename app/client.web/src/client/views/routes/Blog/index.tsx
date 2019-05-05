import { withTranslation, WithTranslation } from "react-i18next";
import { RouteConf } from "@client/views/conf.routes";
import { Blog } from "./component";

export type LocalProps = WithTranslation &
  RouteConf & {
    routes: RouteConf[];
  };

export default withTranslation("route_Blog")(Blog);
