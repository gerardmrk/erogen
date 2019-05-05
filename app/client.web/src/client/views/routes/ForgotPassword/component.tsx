import * as React from "react";
import styles from "./component.styles.scss";
import AuthRoutesWrapper from "@client/views/core/AuthRoutesWrapper";

type Props = {};

type State = {};

export class ForgotPassword extends React.PureComponent<Props, State> {
  public static readonly chunkName = "";
  public static readonly i18nNamespace = "";

  public render() {
    return (
      <AuthRoutesWrapper title={"Forgot Password"}>
        <div className={styles.main}>{"Form"}</div>
      </AuthRoutesWrapper>
    );
  }
}
