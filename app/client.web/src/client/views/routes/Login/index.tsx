import { WithTranslation, withTranslation } from "react-i18next";
import { RouteConf } from "@client/views/conf.routes";
import { Login } from "./component";
import { Omit } from "utility-types";
import { withConfig, WithConfig } from "@client/views/core/ConfigProvider";

export type LocalProps = WithConfig &
  WithTranslation &
  Omit<RouteConf, "component"> & {};

export default withConfig(withTranslation(Login).i18nNamespace)(Login));
