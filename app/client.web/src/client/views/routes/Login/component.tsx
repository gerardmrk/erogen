import * as React from "react";
import styles from "./component.styles.scss";
import AuthRoutesWrapper from "@client/views/core/AuthRoutesWrapper";
import LoginForm from "./LoginForm";

type Props = {};

type State = {};

export class Login extends React.PureComponent<Props, State> {
  public render() {
    return (
      <AuthRoutesWrapper title={"Login"}>
        <div className={styles.main}>
          <LoginForm />
        </div>
      </AuthRoutesWrapper>
    );
  }
}
