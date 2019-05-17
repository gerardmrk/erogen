import { State, Dispatcher } from "@client/store";
import connect from "react-redux/es/connect/connect";
import { EnhancedNavLink } from "./component";

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
