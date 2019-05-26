import { AuthLayout } from "./component";
import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";

export type LocalProps = WithTranslation & {
  title: TKey;
};

export type StoreProps = {};

export type DispatchProps = {};

export default withTranslation("core_AuthLayout")(AuthLayout);
