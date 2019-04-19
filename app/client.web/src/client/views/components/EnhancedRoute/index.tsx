import connect from "react-redux/es/connect/connect";
import { State, Dispatcher } from "@client/store";
import { RouteConf } from "@client/views/conf.routes";
import { EnhancedRoute } from "./component";

export type StoreProps = {
  isAuthenticated: boolean;
};

export type DispatchProps = {};

export type LocalProps = {} & RouteConf;

const mapStateToProps = (state: State, ownProps: LocalProps): StoreProps => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatcher): DispatchProps => ({});

const Component = connect<StoreProps, DispatchProps, LocalProps, State>(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedRoute);

export default Component;
