import { Support } from "./component";
import { WithTranslation, withTranslation } from "react-i18next";
import { RouteConf } from "@client/views/conf.routes";
import { Omit } from "utility-types";

export type LocalProps = WithTranslation & Omit<RouteConf, "component"> & {};

export default withTranslation(Support.i18nNamespace)(Support);
