import { GlobalMessage } from "./component";
import { connect } from "react-redux";
import { State, Dispatcher } from "@client/store";
import { State as MessageState } from "@client/store/state/global-ui-message";
import { hide } from "@client/store/state/global-ui-message/actions";

export type LocalProps = {};

export type StoreProps = {
  msg: MessageState;
};

export type DispatchProps = {
  hide: () => void;
};

const mapStateToProps = (state: State, localProps: LocalProps): StoreProps => ({
  msg: state.globalUIMessage,
});

const mapDispatchToProps = (dispatch: Dispatcher, localProps: LocalProps) => ({
  hide: () => {
    dispatch(hide());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalMessage);
