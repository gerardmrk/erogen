import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class AuthNavs extends React.PureComponent<Props, State> {
  public render() {
    return <div className={styles.main}>{"Navs"}</div>;
  }
}

export default AuthNavs;
