import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
import { Home } from "./component";
import { RouteConf } from "@client/views/conf.routes";
import { Omit } from "utility-types";
import { connect } from "react-redux";
import { State, Dispatcher } from "@client/store";

export type LocalProps = WithTranslation & Omit<RouteConf, "component"> & {};

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
)(withTranslation(Home.i18nNamespace)(Home));
