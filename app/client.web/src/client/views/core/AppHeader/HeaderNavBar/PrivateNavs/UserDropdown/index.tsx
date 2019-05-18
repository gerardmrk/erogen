import { UserDropdown } from "./component";
import { connect } from "react-redux";
import { State, Dispatcher } from "@client/store";
import { logout } from "@client/store/state/auth/actions.logout-async";

export type LocalProps = {};

export type StoreProps = {};

export type DispatchProps = {
  logout: () => void;
};

const mapStateToProps = (
  state: State,
  localProps: LocalProps,
): StoreProps => ({});

const mapDispatchToProps = (
  dispatch: Dispatcher,
  localProps: LocalProps,
): DispatchProps => ({
  logout: () => {
    dispatch(logout());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDropdown);
