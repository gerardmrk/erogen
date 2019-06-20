import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import NavLink from "@client/views/components/EnhancedNavLink";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class PublicNavs extends React.PureComponent<Props, State> {
  public render() {
    return (
      <nav className={styles.main}>
        <div className={styles.navBox}>
          <NavLink to={"/login"}>
            <span>{this.props.t("navs.public.login")}</span>
          </NavLink>
        </div>

        <div className={styles.navBox}>{"/"}</div>

        <div className={styles.navBox}>
          <NavLink to={"/register"}>
            <span>{this.props.t("navs.public.register")}</span>
          </NavLink>
        </div>
      </nav>
    );
  }
}
