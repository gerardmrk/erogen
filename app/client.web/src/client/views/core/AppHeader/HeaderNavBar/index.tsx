import { connect } from "react-redux";
import { State, Dispatcher } from "@client/store";
import HeaderNavBar from "./component";

export type LocalProps = {};

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
)(HeaderNavBar);
