import * as React from "react";
import loadable from "@loadable/component";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";

const PublicNavs = loadable(() => import("./PublicNavs"));
const PrivateNavs = loadable(() => import("./PrivateNavs"));

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
