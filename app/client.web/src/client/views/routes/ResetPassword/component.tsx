import * as React from "react";
import styles from "./component.styles.scss";
import AuthRoutesWrapper from "@client/views/core/AuthRoutesWrapper";

type Props = {};

type State = {};

export class ResetPassword extends React.PureComponent<Props, State> {
  public render() {
    return (
      <AuthRoutesWrapper title={"Reset Your Password"}>
        <div className={styles.main}>{"Form"}</div>
      </AuthRoutesWrapper>
    );
  }
}

export default ResetPassword;
