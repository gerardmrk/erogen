import { withTranslation, WithTranslation } from "react-i18next";
import { RouteConf } from "@client/views/conf.routes";
import { BlogPost } from "./component";

export type LocalProps = WithTranslation & RouteConf & {};

export default withTranslation("route_BlogPost")(BlogPost);
