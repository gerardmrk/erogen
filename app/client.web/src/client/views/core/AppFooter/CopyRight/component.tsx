import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class Copyright extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          {this.props.t("copyright", {
            year: "2019",
            orgName: this.props.config.app.appName,
          })}
        </div>
      </div>
    );
  }
}
