import "@client/views/theme/semantic.less";
import { hot } from "react-hot-loader/root";
import * as React from "react";
import styles from "./App.scss";
import GlobalLoader from "./GlobalLoader";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import AppFooter from "./AppFooter";
import GlobalMessage from "./GlobalMessage";

type Props = {};

type State = {};

export class App extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <GlobalLoader />
        <GlobalMessage />

        <AppHeader />
        <AppContent />
        <AppFooter />
      </div>
    );
  }
}

export default hot(App);
