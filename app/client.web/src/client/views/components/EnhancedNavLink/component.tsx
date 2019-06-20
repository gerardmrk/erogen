import * as React from "react";
import { LocalProps, StoreProps, DispatchProps } from ".";
import { NavLink } from "react-router-dom";
import styles from "./component.styles.scss";

export type Props = LocalProps & StoreProps & DispatchProps;

export type State = {};

export class EnhancedNavLink extends React.PureComponent<Props, State> {
  private disableActiveStyles = false;

  public constructor(props: Props) {
    super(props);
    if (props.disableActiveStyle) {
      this.disableActiveStyles = props.disableActiveStyle;
    }
  }

  private onClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (
      e.metaKey ||
      e.ctrlKey ||
      (this.props.location && this.props.location.pathname === this.props.to)
    ) {
      e.preventDefault();
      return;
    }

    // if (e.metaKey || e.ctrlKey || !this.props.appHasUpdates) {
    //   console.log(this.props);
    //   e.preventDefault();
    //   return;
    // }

    // window.location =
    //   typeof this.props.to === "object"
    //     ? { ...window.location, ...this.props.to }
    //     : { ...window.location, pathname: this.props.to };
  };

  public render() {
    return (
      <NavLink
        to={this.props.to}
        strict={this.props.strict}
        exact={this.props.exact}
        onClick={this.onClick}
        activeClassName={this.disableActiveStyles ? "" : styles.active}
      >
        {this.props.children}
      </NavLink>
    );
  }
}
