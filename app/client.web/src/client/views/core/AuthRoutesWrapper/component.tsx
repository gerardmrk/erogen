import * as React from "react";
import styles from "./styles.scss";
import { Card } from "evergreen-ui";
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
          <Card className={styles.modal} border={"default"}>
            <div className={styles.formBox}>{this.props.children}</div>
            <AuthNavs />
          </Card>
        </Container>
      </div>
    );
  }
}

export default AuthRoutesWrapper;
