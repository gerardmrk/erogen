import { UserDropdown } from "./component";
import { connect } from "react-redux";
import { State, Dispatcher } from "@client/store";
import { logout } from "@client/store/state.auth/async.logout";
import { withRouter, RouteComponentProps } from "react-router";
import { ProfileSettings } from "@client/store/state.user/models";

export type LocalProps = RouteComponentProps & {};

export type StoreProps = {
  isLoadingUser: boolean;
  profile: ProfileSettings | undefined;
};

export type DispatchProps = {
  logout: () => void;
};

const mapStateToProps = (state: State, localProps: LocalProps): StoreProps => ({
  isLoadingUser: state.user.isLoading,
  profile: state.user.profile,
});

const mapDispatchToProps = (
  dispatch: Dispatcher,
  localProps: LocalProps,
): DispatchProps => ({
  logout: () => {
    dispatch(logout());
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserDropdown),
);
