import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Container from "@client/views/components/ui.elements/Container";
import CopyRight from "./CopyRight";
import SiteMap from "./SiteMap";
import SocialLinks from "./SocialLinks";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class AppFooter extends React.PureComponent<Props, State> {
  public render() {
    return (
      <footer className={styles.main}>
        <Container className={styles.container}>
          <SiteMap />
          <SocialLinks />
          <CopyRight />
        </Container>
      </footer>
    );
  }
}
