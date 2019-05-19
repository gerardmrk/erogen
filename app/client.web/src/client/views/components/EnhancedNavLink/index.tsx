import { State, Dispatcher } from "@client/store";
import { EnhancedNavLink } from "./component";
import { connect } from "react-redux";

export type LocalProps = {};

export type StoreProps = {
  appHasUpdates: boolean;
};

export type DispatchProps = {};

const mapStateToProps = (state: State, localProps: LocalProps): StoreProps => ({
  appHasUpdates: false,
});

const mapDispatchToProps = (
  dispatch: Dispatcher,
  localProps: LocalProps,
): DispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedNavLink);
