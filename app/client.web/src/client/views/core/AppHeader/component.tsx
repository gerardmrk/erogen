import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Container from "@client/views/components/ui.elements/Container";
import Logo from "./Logo";
import HeaderNavBar from "./HeaderNavBar";

export type Props = LocalProps & StoreProps & DispatchProps;

export type State = {};

export class AppHeader extends React.PureComponent<Props, State> {
  public static readonly i18nNamespace = "core_AppHeader";

  public render() {
    return (
      <header className={styles.main}>
        <Container className={styles.container}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <HeaderNavBar />
        </Container>
      </header>
    );
  }
}
