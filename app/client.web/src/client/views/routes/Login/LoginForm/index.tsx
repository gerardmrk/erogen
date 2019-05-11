import { LoginForm } from "./component";
import { withTranslation, WithTranslation } from "react-i18next";

export type LocalProps = WithTranslation & {};

export default withTranslation(LoginForm.i18nNamespace)(LoginForm);
