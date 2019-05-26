import { GlobalMessage } from "./component";
import { connect } from "react-redux";
import { State, Dispatcher } from "@client/store";
import { State as MessageState } from "@client/store/state.ui-message";
import { hide } from "@client/store/state.ui-message/actions";
import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";

export type LocalProps = WithTranslation & {};

export type StoreProps = {
  msg: MessageState;
};

export type DispatchProps = {
  hide: () => void;
};

const mapStateToProps = (state: State, localProps: LocalProps): StoreProps => ({
  msg: state.uiMessage,
});

const mapDispatchToProps = (dispatch: Dispatcher, localProps: LocalProps) => ({
  hide: () => {
    dispatch(hide());
  },
});

export default withTranslation("core_GlobalMessage")(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GlobalMessage),
);
