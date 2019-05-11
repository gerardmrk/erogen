import { withTranslation, WithTranslation } from "react-i18next";
import { Landing } from "./component";
import { RouteConf } from "@client/views/conf.routes";
import { Omit } from "utility-types";

export type LocalProps = WithTranslation & Omit<RouteConf, "component"> & {};

export default withTranslation(Landing.i18nNamespace)(Landing);
