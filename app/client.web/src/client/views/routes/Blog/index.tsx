import { RouteConf } from "@client/views/conf.routes";
import { Blog } from "./component";
import { withTranslation, WithTranslation } from "react-i18next";

export type LocalProps = WithTranslation & {
  routes: RouteConf[];
};

export default withTranslation("route_Blog")(Blog);
