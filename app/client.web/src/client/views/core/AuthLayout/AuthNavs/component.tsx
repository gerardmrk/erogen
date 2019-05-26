import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import { authNavs } from "@client/views/conf.navs";
import EnhancedNavLink from "@client/views/components/EnhancedNavLink";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class AuthNavs extends React.PureComponent<Props, State> {
  public render() {
    return (
      <nav className={styles.main}>
        {authNavs.map((n, i) => (
          <EnhancedNavLink key={i} to={n.to}>
            {this.props.t(n.label)}
          </EnhancedNavLink>
        ))}
      </nav>
    );
  }
}
