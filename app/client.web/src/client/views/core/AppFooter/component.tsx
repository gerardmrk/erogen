import * as React from "react";
import { Pane } from "evergreen-ui";
import styles from "./styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Container from "@client/views/components/Container";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class AppFooter extends React.PureComponent<Props, State> {
  public render() {
    return (
      <Pane background={"blueTint"}>
        <footer className={styles.main}>
          <Container className={styles.container}>{"..."}</Container>
        </footer>
      </Pane>
    );
  }
}

export default AppFooter;
