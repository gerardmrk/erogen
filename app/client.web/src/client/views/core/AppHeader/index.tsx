import { connect } from "react-redux";
import { State, Dispatcher } from "@client/store";

import { AppHeader } from "./component";
import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";

export type LocalProps = WithTranslation & {};

export type StoreProps = {
  isAuthenticated: boolean;
};

export type DispatchProps = {};

const mapStateToProps = (state: State): StoreProps => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch: Dispatcher): DispatchProps => ({});

export default withTranslation(AppHeader.i18nNamespace)(
  connect<StoreProps, DispatchProps, LocalProps, State>(
    mapStateToProps,
    mapDispatchToProps,
  )(AppHeader),
);
