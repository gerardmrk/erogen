import * as React from "react";
import styles from "./styles.scss";
import { Pane } from "evergreen-ui/esm/layers";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Container from "@client/views/components/Container";
import Logo from "./Logo";
import HeaderNavBar from "./HeaderNavBar";

export type Props = LocalProps & StoreProps & DispatchProps;

export type State = {};

export class AppHeader extends React.PureComponent<Props, State> {
  public render() {
    return (
      <Pane
        borderColor={"x"}
        is={"header"}
        border={"muted"}
        background={"blueTint"}
      >
        <Container className={styles.container}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <HeaderNavBar />
        </Container>
      </Pane>
    );
  }
}

export default AppHeader;
