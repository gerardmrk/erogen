import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import { Switch } from "react-router";
import { routeConfs, RouteConf } from "@client/views/conf.routes";
import EnhancedRoute from "@client/views/components/EnhancedRoute";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

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

  private renderRoute = (r: RouteConf, i: number) => (
    <EnhancedRoute key={i} {...r} />
  );

  public render() {
    return (
      <main className={styles.main}>
        <TransitionGroup component={null}>
          <CSSTransition
            key={this.props.location.key}
            timeout={this.transitionTimeout}
            classNames={this.transitionClassNames}
          >
            <div className={styles.routeContainer}>
              <Switch location={this.props.location}>
                {routeConfs.map(this.renderRoute)}
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </main>
    );
  }
}
