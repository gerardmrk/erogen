import * as React from "react";
import { Text } from "evergreen-ui/esm/typography";
import { NavLink as BaseNavLink } from "react-router-dom";
import styles from "./styles.scss";

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
        <Text size={500}>{this.props.label}</Text>
      </BaseNavLink>
    );
  }
}

export default NavLink;
