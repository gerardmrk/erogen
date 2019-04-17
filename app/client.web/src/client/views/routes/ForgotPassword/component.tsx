import * as React from "react";
import styles from "./styles.scss";
import AuthRoutesWrapper from "@client/views/core/AuthRoutesWrapper";

type Props = {};

type State = {};

export class ForgotPassword extends React.PureComponent<Props, State> {
  public render() {
    return (
      <AuthRoutesWrapper>
        <div className={styles.main}>
          <h1>{"ForgotPassword"}</h1>
        </div>
      </AuthRoutesWrapper>
    );
  }
}

export default ForgotPassword;
