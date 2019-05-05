import * as React from "react";
import styles from "./component.styles.scss";
import AuthRoutesWrapper from "@client/views/core/AuthRoutesWrapper";

type Props = {};

type State = {};

export class Register extends React.PureComponent<Props, State> {
  public static readonly chunkName = "";
  public static readonly i18nNamespace = "";

  public render() {
    return (
      <AuthRoutesWrapper title={"Register"}>
        <div className={styles.main}>{"x"}</div>
      </AuthRoutesWrapper>
    );
  }
}

export default Register;
