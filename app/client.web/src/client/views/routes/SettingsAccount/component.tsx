import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps } from ".";

type Props = LocalProps;

type State = {};

export class SettingsAccount extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <h1>{"SettingsAccount"}</h1>
      </div>
    );
  }
}

export default SettingsAccount;
