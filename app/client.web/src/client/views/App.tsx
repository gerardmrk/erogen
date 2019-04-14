import * as React from "react";
import { hot } from "react-hot-loader";
import { withRouter, RouteComponentProps, Switch } from "react-router";
import styles from "./App.scss";
import routeConfs from "./conf.routes";
import EnhancedRoute from "./core/EnhancedRoute";

type Props = {};

type State = {};

export class App extends React.Component<
  Props & RouteComponentProps<{}>,
  State
> {
  public render() {
    return (
      <div className={styles.main}>
        <main className={styles.container}>
          <Switch>
            {routeConfs.map((r, i) => (
              <EnhancedRoute key={i} {...r} />
            ))}
          </Switch>
        </main>
      </div>
    );
  }
}

export default hot(module)(withRouter(App));
