import * as React from "react";
import styles from "./styles.scss";

type Props = {};

type State = {};

export class LoadingDisplay extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <div className={styles.container}>{"Loading"}</div>
      </div>
    );
  }
}

export default LoadingDisplay;
