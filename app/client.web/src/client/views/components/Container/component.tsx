import * as React from "react";
import styles from "./styles.scss";

type Props = {};

type State = {};

export class Container extends React.PureComponent<Props, State> {
  public render() {
    // prettier-ignore
    return (
      <div className={styles.main}>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
