import * as React from "react";
import { LocationDescriptorObject } from "history";
import { Route as BaseRoute, RouteComponentProps, Redirect } from "react-router-dom"; // prettier-ignore
import { LocalProps, StoreProps, DispatchProps } from ".";
import { LOGIN_PATH, DEFAULT_PRIVATE_PATH } from "@client/views/conf.routes"; // prettier-ignore

export type Props = LocalProps & StoreProps & DispatchProps;

export type State = {};

export class EnhancedRoute extends React.Component<Props, State> {
  private redirectTo: LocationDescriptorObject = {
    pathname: LOGIN_PATH,
    search: "",
    state: { from: "" },
  };

  public constructor(props) {
    super(props);

    const fromRoute =
      props.location && props.location.pathname
        ? `${props.location.pathname}${props.location.search || ""}`
        : DEFAULT_PRIVATE_PATH;

    this.redirectTo.state.from = fromRoute;
    this.redirectTo.search = `?from=${encodeURIComponent(fromRoute)}`;
  }

  private renderRoute = (rcprops: RouteComponentProps) => {
    const Component = this.props.component;
    return <Component {...rcprops} routes={this.props.routes} />;
  };

  public render() {
    const { path, exact, strict, guarded, isAuthenticated } = this.props;

    if (guarded && !isAuthenticated) {
      return <Redirect to={this.redirectTo} />;
    }

    return (
      <BaseRoute
        path={path}
        exact={exact}
        strict={strict}
        render={this.renderRoute}
      />
    );
  }
}

export default EnhancedRoute;
