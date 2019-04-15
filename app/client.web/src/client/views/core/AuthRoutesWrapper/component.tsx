import * as React from "react";
import styles from "./styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import AuthNavs from "./AuthNavs";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class AuthRoutesWrapper extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <div>{this.props.children}</div>
          <AuthNavs />
        </div>
      </div>
    );
  }
}

export default AuthRoutesWrapper;
