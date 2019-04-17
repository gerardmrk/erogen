import * as React from "react";
import styles from "./styles.scss";

type Props = {};

type State = {};

export class NotFound extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <h1>{"NotFound"}</h1>
      </div>
    );
  }
}

export default NotFound;
