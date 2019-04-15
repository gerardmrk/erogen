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
      <Pane className={styles.main} border={"muted"} background={"tint3"}>
        <Container className={styles.container}>{"AppFooter"}</Container>
      </Pane>
    );
  }
}

export default AppFooter;
