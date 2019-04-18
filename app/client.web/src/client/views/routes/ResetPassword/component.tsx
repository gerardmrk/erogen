import * as React from "react";
import styles from "./component.styles.scss";
import AuthRoutesWrapper from "@client/views/core/AuthRoutesWrapper";

type Props = {};

type State = {};

export class ResetPassword extends React.PureComponent<Props, State> {
  public render() {
    return (
      <AuthRoutesWrapper>
        <div className={styles.main}>
          <h1>{"ResetPassword"}</h1>
        </div>
      </AuthRoutesWrapper>
    );
  }
}

export default ResetPassword;
