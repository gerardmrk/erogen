import { LoginForm } from "./component";
import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
export type LocalProps = WithTranslation & {};

export default withTranslation("route_Login")(LoginForm);
