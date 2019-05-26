import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import UserDropdown from "./UserDropdown";
// import Menu from "@client/views/components/ui.collections/Menu";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class PrivateNavs extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <div className={styles.navs}>{"..."}</div>
        <div className={styles.userdropdown}>
          <UserDropdown />
        </div>
      </div>
    );
  }
}
