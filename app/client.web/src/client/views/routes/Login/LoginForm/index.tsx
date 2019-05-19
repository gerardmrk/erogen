import { LoginForm } from "./component";
import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
import { State, Dispatcher } from "@client/store";
import { connect } from "react-redux";
import { login } from "@client/store/auth/async.login";
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

export default withTranslation("route_Login")(
  connect<StoreProps, DispatchProps, LocalProps, State>(
    mapStateToProps,
    mapDispatchToProps,
  )(LoginForm),
);
