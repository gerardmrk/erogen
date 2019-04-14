import * as React from "react";
import { Heading } from "evergreen-ui";
import styles from "./styles.scss";

type Props = {};

type State = {};

export class ForgotPassword extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Heading size={700}>{"ForgotPassword"}</Heading>
      </div>
    );
  }
}

export default ForgotPassword;
