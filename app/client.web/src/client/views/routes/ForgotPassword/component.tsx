import * as React from "react";
import styles from "./component.styles.scss";
import AuthRoutesWrapper from "@client/views/core/AuthRoutesWrapper";
import { LocalProps } from ".";

type Props = LocalProps;

type State = {};

export class ForgotPassword extends React.PureComponent<Props, State> {
  public render() {
    return (
      <AuthRoutesWrapper title={"Forgot Password"}>
        <div className={styles.main}>{"Form"}</div>
      </AuthRoutesWrapper>
    );
  }
}
