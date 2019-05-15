import { GlobalLoader } from "./component";
import { State, Dispatcher } from "@client/store";
import { connect } from "react-redux";

export type LocalProps = {};

export type StoreProps = {
  loading: boolean;
  message: string | undefined;
};

export type DispatchProps = {};

const mapStateToProps = (state: State, localProps: LocalProps): StoreProps => ({
  loading: state.globalUILoader.loading,
  message: state.globalUILoader.message,
});

const mapDispatchToProps = (
  dispatch: Dispatcher,
  localProps: LocalProps,
): DispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalLoader);
