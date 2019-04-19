import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Container from "@client/views/components/Container";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class AppFooter extends React.PureComponent<Props, State> {
  public render() {
    return (
      <footer className={styles.main}>
        <Container className={styles.container}>{"F O O T E R"}</Container>
      </footer>
    );
  }
}

export default AppFooter;
