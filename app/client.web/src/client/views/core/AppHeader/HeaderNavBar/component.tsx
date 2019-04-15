import * as React from "react";
import styles from "./styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";

export type Props = LocalProps & StoreProps & DispatchProps;
export type State = {};

export class HeaderNavBar extends React.Component<Props, State> {
  public render() {
    return <nav className={styles.main}>{"HeaderNavBar"}</nav>;
  }
}

export default HeaderNavBar;
