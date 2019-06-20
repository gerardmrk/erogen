import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Container from "@client/views/components/ui-elements/Container";
import Copyright from "./Copyright";
import SiteMap from "./SiteMap";
import SocialLinks from "./SocialLinks";
import LanguageSelector from "@client/views/components/LanguageSelector";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class AppFooter extends React.PureComponent<Props, State> {
  public render() {
    return (
      <footer className={styles.main}>
        <Container className={styles.container}>
          <SiteMap />
          <SocialLinks />

          <div className={styles.footerEnd}>
            <Copyright />
            <LanguageSelector />
          </div>
        </Container>
      </footer>
    );
  }
}
