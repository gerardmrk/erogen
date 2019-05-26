import { Copyright } from "./component";
import { withConfig, WithConfig } from "@client/views/core/ConfigProvider";
import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";

export type LocalProps = WithConfig & WithTranslation & {};

export type StoreProps = {};

export type DispatchProps = {};

export default withTranslation("core_AppFooter")(withConfig(Copyright));
