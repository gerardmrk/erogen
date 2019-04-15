import * as React from "react";
import { Heading } from "evergreen-ui";
import styles from "./styles.scss";
import AuthRoutesWrapper from "@client/views/core/AuthRoutesWrapper";

type Props = {};

type State = {};

export class Register extends React.PureComponent<Props, State> {
  public render() {
    return (
      <AuthRoutesWrapper>
        <div className={styles.main}>
          <Heading size={700}>{"Register"}</Heading>
        </div>
      </AuthRoutesWrapper>
    );
  }
}

export default Register;
