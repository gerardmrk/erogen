import * as React from "react";
import styles from "./styles.scss";

type Props = {};

type State = {};

export class Auth extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <h1>{"Auth"}</h1>
      </div>
    );
  }
}

export default Auth;
