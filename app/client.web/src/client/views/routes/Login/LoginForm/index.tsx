import { Login } from "../component";
import { LoginForm } from "./component";
import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
export type LocalProps = WithTranslation & {};

export default withTranslation(Login.i18nNamespace)(LoginForm);
