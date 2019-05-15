import { LoginForm } from "./component";
import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
import { State, Dispatcher } from "@client/store";
import { connect } from "react-redux";
import { login } from "@client/store/state/auth/actions.login-async";
export type LocalProps = WithTranslation & {};

export type StoreProps = {};

export type DispatchProps = {
  login: (alias: string, password: string, remember: boolean) => void;
};

const mapStateToProps = (state: State, localProps: LocalProps) => ({});

const mapDispatchToProps = (
  dispatch: Dispatcher,
  localProps: LocalProps,
): DispatchProps => ({
  login: (alias: string, password: string, remember: boolean) => {
    dispatch(login(alias, password, remember));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation("route_Login")(LoginForm));
