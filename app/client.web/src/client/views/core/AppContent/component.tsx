import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styles from "./styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import { Switch, withRouter, RouteComponentProps } from "react-router";
import LoadingDisplay from "./LoadingDisplay";
import routeConfs from "@client/views/conf.routes";
import EnhancedRoute from "@client/views/components/EnhancedRoute";

type Props = LocalProps & StoreProps & DispatchProps & RouteComponentProps;

type State = {
  triggerTransition: boolean;
};

export class AppContent extends React.PureComponent<Props, State> {
  private transitionTimeout = {
    enter: 310,
    exit: 310,
  };

  private transitionClassNames = {
    enter: styles.routeEnter,
    enterActive: styles.routeEnterActive,
    exit: styles.routeExit,
    exitActive: styles.routeExitActive,
  };

  public state = {
    triggerTransition: false,
  };

  private onRouteLoaderRender = (displaying: boolean) => {
    this.setState({ triggerTransition: displaying });
  };

  public render() {
    return (
      <main className={styles.main}>
        <TransitionGroup className={styles.transitionWrapper}>
          <CSSTransition
            key={`${this.props.location.key}:${this.state.triggerTransition}`}
            timeout={this.transitionTimeout}
            classNames={this.transitionClassNames}
          >
            <div className={styles.routeContainer}>
              <React.Suspense
                fallback={
                  <LoadingDisplay onRender={this.onRouteLoaderRender} />
                }
              >
                <Switch location={this.props.location}>
                  {routeConfs.map((r, i) => (
                    <EnhancedRoute key={i} {...r} />
                  ))}
                </Switch>
              </React.Suspense>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </main>
    );
  }
}

export default withRouter(AppContent);
