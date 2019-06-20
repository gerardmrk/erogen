import { State, Dispatcher } from "@client/store";
import { EnhancedNavLink } from "./component";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { NavLinkProps } from "react-router-dom";

export type LocalProps = RouteComponentProps &
  NavLinkProps & {
    disableActiveStyle?: boolean;
  };

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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EnhancedNavLink),
);
