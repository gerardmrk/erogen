import * as React from "react";
import { Route as BaseRoute, Redirect } from "react-router-dom"; // prettier-ignore
import { LocalProps, StoreProps, DispatchProps } from ".";
import { DEFAULT_PRIVATE_PATH, loginPage } from "@client/views/conf.routes"; // prettier-ignore
import HeadTags from "./HeadTags";

export type Props = LocalProps & StoreProps & DispatchProps;

export type State = {};

export class EnhancedRoute extends React.Component<Props, State> {
  public static defaultProps = {
    status: 200
  };

  private redirectTo = {
    pathname: "/login",
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
    if (this.props.staticContext) {
      this.props.staticContext["statusCode"] = this.props.status || 200;
    }

    if (this.props.guarded && !this.props.isAuthenticated) {
      return props.action === "REPLACE" ? null : (
        <React.Fragment>
          <HeadTags
            path={loginPage.path}
            title={loginPage.title}
            description={loginPage.description}
          />
          <Redirect from={this.props.path} to={this.redirectTo} />
        </React.Fragment>
      );
    }

    const RouteComponent = this.props.component;
    return (
      <React.Fragment>
        <HeadTags
          path={this.props.path}
          title={this.props.title}
          description={this.props.description}
          metaType={this.props.metaType}
          metaImgPath={this.props.metaImgPath}
          metaImgAlt={this.props.metaImgAlt}
          metaTwitterCardType={this.props.metaTwitterCardType}
        />
        <RouteComponent {...props} routes={this.props.routes} />
      </React.Fragment>
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

export default EnhancedRoute;
