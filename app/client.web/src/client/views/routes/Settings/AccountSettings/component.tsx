import * as React from "react";
import styles from "./component.styles.scss";

type Props = {};

type State = {};

export class AccountSettings extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <h1>{"AccountSettings"}</h1>
      </div>
    );
  }
}

export default AccountSettings;
