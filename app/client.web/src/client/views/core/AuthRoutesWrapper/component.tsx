import * as React from "react";
import styles from "./styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import AuthNavs from "./AuthNavs";
import Container from "@client/views/components/Container";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class AuthRoutesWrapper extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Container className={styles.container}>
          <div className={styles.modal}>
            <div className={styles.formBox}>{this.props.children}</div>
            <AuthNavs />
          </div>
        </Container>
      </div>
    );
  }
}

export default AuthRoutesWrapper;
