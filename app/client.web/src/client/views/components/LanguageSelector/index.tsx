import { LanguageSelector } from "./component";
import { withConfig, WithConfig } from "@client/views/core/ConfigProvider";
import { withTranslation } from "react-i18next";
import { WithTranslation } from "@client/views/core/I18nProvider";

export type LocalProps = WithConfig & WithTranslation & {};

export type StoreProps = {};

export type DispatchProps = {};

export default withConfig(withTranslation()(LanguageSelector));
