import * as React from "react";
import { NavLink as BaseNavLink } from "react-router-dom";
import styles from "./component.styles.scss";

type Props = {
  path: string;
  label: string;
  exact?: boolean;
  strict?: boolean;
};

type State = {};

export class NavLink extends React.PureComponent<Props, State> {
  public render() {
    return (
      <BaseNavLink
        strict={this.props.strict}
        exact={this.props.exact}
        activeClassName={styles.active}
        to={this.props.path}
      >
        <span>{this.props.label}</span>
      </BaseNavLink>
    );
  }
}

export default NavLink;
