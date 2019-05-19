import * as React from "react";
import { LocalProps, StoreProps, DispatchProps } from ".";
import { NavLink, NavLinkProps } from "react-router-dom";

export type Props = LocalProps & StoreProps & DispatchProps & NavLinkProps;

export type State = {};

export class EnhancedNavLink extends React.PureComponent<Props, State> {
  private onClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (e.metaKey || e.ctrlKey || !this.props.appHasUpdates) return;
    e.preventDefault();
    window.location =
      typeof this.props.to === "object"
        ? { ...window.location, ...this.props.to }
        : { ...window.location, pathname: this.props.to };
  };

  public render() {
    return (
      <NavLink to={this.props.to} onClick={this.onClick}>
        {this.props.children}
      </NavLink>
    );
  }
}
