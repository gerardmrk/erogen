import * as React from "react";
import styles from "./styles.scss";
import { Pane } from "evergreen-ui";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Container from "@client/views/components/Container";
import Logo from "@client/views/components/Logo";
import HeaderNavBar from "./HeaderNavBar";

export type Props = LocalProps & StoreProps & DispatchProps;

export type State = {};

export class AppHeader extends React.PureComponent<Props, State> {
  public render() {
    return (
      <Pane border={"muted"} background={"blueTint"}>
        <header className={styles.main}>
          <Container className={styles.container}>
            <Logo />
            <HeaderNavBar />
          </Container>
        </header>
      </Pane>
    );
  }
}

export default AppHeader;
