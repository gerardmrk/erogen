import * as React from "react";
import { Route as BaseRoute, RouteComponentProps, Redirect } from "react-router-dom"; // prettier-ignore
import { LocalProps, StoreProps, DispatchProps } from ".";
import { LOGIN_PATH, DEFAULT_PRIVATE_PATH } from "@client/views/conf.routes"; // prettier-ignore
import HeadTags from "./HeadTags";

export type Props = LocalProps & StoreProps & DispatchProps;

export type State = {};

export class EnhancedRoute extends React.Component<Props, State> {
  private redirectTo = {
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
    const { guarded, isAuthenticated, ...routeProps } = this.props;

    if (guarded && !isAuthenticated) {
      return <Redirect to={this.redirectTo} />;
    }

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
