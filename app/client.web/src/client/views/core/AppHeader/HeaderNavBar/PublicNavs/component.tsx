import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import NavLink from "@client/views/components/NavLink";
import { headerNavsPublic } from "@client/views/conf.navs";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class PublicNavs extends React.PureComponent<Props, State> {
  public render() {
    return (
      <nav className={styles.main}>
        <div className={styles.otherNavsGroup}>
          {headerNavsPublic.map((n, i) => (
            <div className={styles.navBox} key={i}>
              <NavLink path={n.to} label={n.label} />
            </div>
          ))}
        </div>

        <div className={styles.defaultNavsGroup}>
          <div className={styles.navBox}>
            <NavLink
              path={"/login"}
              label={this.props.t("navs.public.login")}
            />
          </div>

          <div className={styles.navBox}>{"/"}</div>

          <div className={styles.navBox}>
            <NavLink
              path={"/register"}
              label={this.props.t("navs.public.register")}
            />
          </div>
        </div>
      </nav>
    );
  }
}
