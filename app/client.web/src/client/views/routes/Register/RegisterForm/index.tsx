import { RegisterForm } from "./component";
import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
import { State, Dispatcher } from "@client/store";
import { connect } from "react-redux";
import { register } from "@client/store/state.auth/async.register";
import { checkUsernameExists } from "@client/store/state.auth/async.checkUsernameExists";
export type LocalProps = WithTranslation & {};

export type StoreProps = {};

export type DispatchProps = {
  register: (
    payload: { username: string; email: string; password: string },
    callback: (err: Error | null) => void,
  ) => void;
  checkUsernameExists: (username: string) => Promise<boolean>;
};

const mapStateToProps = (state: State, localProps: LocalProps) => ({});

const mapDispatchToProps = (
  dispatch: Dispatcher,
  localProps: LocalProps,
): DispatchProps => ({
  register: (payload, callback) => {
    dispatch(register(payload, callback));
  },
  checkUsernameExists: username => {
    return new Promise((resolve, reject) => {
      dispatch(
        checkUsernameExists(username, (err, exists) => {
          if (err) return resolve(true);
          return resolve(exists);
        }),
      );
    });
  },
});

export default withTranslation("route_Register")(
  connect<StoreProps, DispatchProps, LocalProps, State>(
    mapStateToProps,
    mapDispatchToProps,
  )(RegisterForm),
);
