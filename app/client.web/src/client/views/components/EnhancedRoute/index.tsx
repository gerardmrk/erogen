import { connect } from "react-redux";
import { withTranslation, WithTranslation } from "react-i18next";

import { State, Dispatcher } from "@client/store";
import { RouteConf } from "@client/views/conf.routes";
import { EnhancedRoute } from "./component";

export type StoreProps = {
  isAuthenticated: boolean;
};

export type DispatchProps = {};

export type LocalProps = { staticContext?: object } & RouteConf &
  WithTranslation;

const mapStateToProps = (state: State, ownProps: LocalProps): StoreProps => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch: Dispatcher): DispatchProps => ({});

export default withTranslation()(
  connect<StoreProps, DispatchProps, LocalProps, State>(
    mapStateToProps,
    mapDispatchToProps,
  )(EnhancedRoute),
);
