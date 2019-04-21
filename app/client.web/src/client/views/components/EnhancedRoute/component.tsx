import * as React from "react";
import { Route as BaseRoute, Redirect } from "react-router-dom"; // prettier-ignore
import { LocalProps, StoreProps, DispatchProps } from ".";
import { LOGIN_PATH, DEFAULT_PRIVATE_PATH } from "@client/views/conf.routes"; // prettier-ignore
import HeadTags from "./HeadTags";

export type Props = LocalProps & StoreProps & DispatchProps;

export type State = {};

export class EnhancedRoute extends React.Component<Props, State> {
  public static defaultProps = {
    status: 200
  };

  private redirectTo = {
    pathname: LOGIN_PATH,
    search: "",
    state: { from: "" }
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

  private renderRoute = props => {
    if (this.props.guarded && !this.props.isAuthenticated) {
      if (this.props.staticContext) {
        this.props.staticContext["status"] = 302;
        this.props.staticContext["url"] = this.redirectTo.pathname;
      }
      return props.action === "REPLACE" ? null : (
        <Redirect from={this.props.path} to={this.redirectTo} />
      );
    }
    if (this.props.staticContext) {
      this.props.staticContext["status"] = this.props.status || 200;
    }
    const RouteComponent = this.props.component;
    return <RouteComponent {...props} routes={this.props.routes} />;
  };

  public render() {
    const { guarded, isAuthenticated, ...routeProps } = this.props;

    return (
      <React.Fragment>
        <HeadTags
          path={routeProps.path}
          title={routeProps.title}
          description={routeProps.description}
          metaType={routeProps.metaType}
          metaImgPath={routeProps.metaImgPath}
          metaImgAlt={routeProps.metaImgAlt}
          metaTwitterCardType={routeProps.metaTwitterCardType}
        />
        <BaseRoute
          path={routeProps.path}
          exact={routeProps.exact}
          strict={routeProps.strict}
          render={this.renderRoute}
        />
      </React.Fragment>
    );
  }
}

export default EnhancedRoute;
