import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
import { RouteConf } from "@client/views/conf.routes";
import { Documentation } from "./component";
import { Omit } from "utility-types";

export type LocalProps = WithTranslation & Omit<RouteConf, "component"> & {};

export default withTranslation(Documentation.i18nNamespace)(Documentation);
