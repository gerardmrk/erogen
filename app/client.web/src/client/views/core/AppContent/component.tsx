import * as React from "react";
import styles from "./styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import { Switch } from "react-router";
import LoadingDisplay from "./LoadingDisplay";
import routeConfs from "@client/views/conf.routes";
import EnhancedRoute from "@client/views/components/EnhancedRoute";
import Container from "@client/views/components/Container";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class AppContent extends React.PureComponent<Props, State> {
  public render() {
    return (
      <main className={styles.main}>
        <Container>
          <React.Suspense fallback={<LoadingDisplay />}>
            <Switch>
              {routeConfs.map((r, i) => (
                <EnhancedRoute key={i} {...r} />
              ))}
            </Switch>
          </React.Suspense>
        </Container>
      </main>
    );
  }
}

export default AppContent;
