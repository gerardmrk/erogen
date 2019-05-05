import { connect } from "react-redux";
import { State, Dispatcher } from "@client/store";

import { AppHeader } from "./component";

export type LocalProps = {};

export type StoreProps = {
  isAuthenticated: boolean;
};

export type DispatchProps = {};

const mapStateToProps = (state: State): StoreProps => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch: Dispatcher): DispatchProps => ({});

export default connect<StoreProps, DispatchProps, LocalProps, State>(
  mapStateToProps,
  mapDispatchToProps,
)(AppHeader);
