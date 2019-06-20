import { RegisterForm } from "./component";
import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
import { State, Dispatcher } from "@client/store";
import { connect } from "react-redux";
import { register } from "@client/store/state.auth/async.register";
export type LocalProps = WithTranslation & {};

export type StoreProps = {};

export type DispatchProps = {
  register: (
    payload: { username: string; email: string; password: string },
    callback: (err: Error | null) => void,
  ) => void;
};

const mapStateToProps = (state: State, localProps: LocalProps) => ({});

const mapDispatchToProps = (
  dispatch: Dispatcher,
  localProps: LocalProps,
): DispatchProps => ({
  register: (payload, callback) => {
    dispatch(register(payload, callback));
  },
});

export default withTranslation("route_Register")(
  connect<StoreProps, DispatchProps, LocalProps, State>(
    mapStateToProps,
    mapDispatchToProps,
  )(RegisterForm),
);
