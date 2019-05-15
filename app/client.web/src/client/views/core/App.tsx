import "@client/views/theme/semantic.less";
import * as React from "react";
import { hot } from "react-hot-loader";
import loadable from "@loadable/component";
import styles from "./App.scss";
import GlobalLoader from "./GlobalLoader";

const AppHeader = loadable(() => import("@client/views/core/AppHeader"));
const AppContent = loadable(() => import("@client/views/core/AppContent"));
const AppFooter = loadable(() => import("@client/views/core/AppFooter"));

type Props = {};

type State = {};

export class App extends React.Component<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <GlobalLoader />
        <AppHeader />
        <AppContent />
        <AppFooter />
      </div>
    );
  }
}

export default hot(module)(App);
