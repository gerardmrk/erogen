import * as React from "react";
import {
  Route as BaseRoute,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import LoadingDisplay from "./LoadingDisplay";
import { LocalProps, StoreProps, DispatchProps } from ".";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class EnhancedRoute extends React.Component<Props, State> {
  private renderRoute = (rcprops: RouteComponentProps) => {
    const Component = this.props.component;
    return <Component {...rcprops} routes={this.props.routes} />;
  };

  public render() {
    const { path, exact, strict, guarded, isAuthenticated } = this.props;

    if (guarded && !isAuthenticated) {
      return <Redirect to={"/"} />;
    }

    return (
      <React.Suspense fallback={<LoadingDisplay />}>
        <BaseRoute
          path={path}
          exact={exact}
          strict={strict}
          render={this.renderRoute}
        />
      </React.Suspense>
    );
  }
}

export default EnhancedRoute;
