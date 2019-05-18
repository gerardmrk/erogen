import * as React from "react";
import { Route as BaseRoute, Redirect } from "react-router-dom"; // prettier-ignore
import { LocalProps, StoreProps, DispatchProps } from ".";

export type Props = LocalProps & StoreProps & DispatchProps;

export type State = {};

// prettier-ignore
export class EnhancedRoute extends React.Component<Props, State> {
  public static defaultProps = {
    status: 200,
  };

  private redirectTo = {
    pathname: "/login",
    search: "",
    state: { from: "" },
  };

  public constructor(props) {
    super(props);

    let fromRoute;

    if (props.location && props.location.pathname) {
      fromRoute = `${props.location.pathname}${props.location.search || ""}`
    } else {
      fromRoute = "/"
    }

    this.redirectTo.state.from = fromRoute;
    this.redirectTo.search = `?from=${encodeURIComponent(fromRoute)}`;
  }

  private renderRoute = routeProps => {
    const { component: RouteComponent, ...props } = this.props;

    // staticContext exists if route is being rendered on the server.
    // we use this to communicate route-specific settings to the caller.

    if (this.props.staticContext) {
      this.props.staticContext["statusCode"] = this.props.status || 200;
    }

    if (this.props.guarded && !this.props.isAuthenticated) {
      return routeProps.action === "REPLACE" ? null : (
        <Redirect
          from={this.props.path}
          to={this.redirectTo}
        />
      );
    }

    return (
      <RouteComponent
        {...props}
        {...routeProps}
        routes={this.props.routes}
      />
    );
  };

  public render() {
    return (
      <BaseRoute
        path={this.props.path}
        exact={this.props.exact}
        strict={this.props.strict}
        render={this.renderRoute}
      />
    );
  }
}
