import * as React from "react";
import { hot } from "react-hot-loader";
import { withRouter, RouteComponentProps } from "react-router";
import styles from "./App.scss";
import AppContent from "./AppContent";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

type Props = {} & RouteComponentProps;

type State = {};

export class App extends React.Component<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </div>
    );
  }
}

export default hot(module)(withRouter(App));
