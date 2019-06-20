import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
import { RouteConf } from "@client/views/conf.routes";
import { Login } from "./component";
import { Omit } from "utility-types";
import { State, Dispatcher } from "@client/store";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withConfig, WithConfig } from "@client/views/core/ConfigProvider";

export type LocalProps = WithConfig &
  WithTranslation &
  RouteComponentProps &
  Omit<RouteConf, "component"> & {};

export type StoreProps = {
  isAuthenticated: boolean;
};

export type DispatchProps = {};

const mapStateToProps = (state: State, localProps: LocalProps): StoreProps => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (
  dispatch: Dispatcher,
  localProps: LocalProps,
): DispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withConfig(withTranslation(Login.i18nNamespace)(Login)));
