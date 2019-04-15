import * as React from "react";
import styles from "./styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import PrivateNavs from "./PrivateNavs";
import PublicNavs from "./PublicNavs";

export type Props = LocalProps & StoreProps & DispatchProps;
export type State = {};

export class HeaderNavBar extends React.Component<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        {this.props.isAuthenticated ? <PrivateNavs /> : <PublicNavs />}
      </div>
    );
  }
}

export default HeaderNavBar;
