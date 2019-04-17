import * as React from "react";
import styles from "./styles.scss";

type Props = {
  onRender: (displaying: boolean) => void;
};

type State = {};

export class LoadingDisplay extends React.PureComponent<Props, State> {
  public componentWillMount() {
    this.props.onRender(true);
  }

  public componentWillUnmount() {
    this.props.onRender(false);
  }

  public render() {
    return (
      <div className={styles.main}>
        <div className={styles.container}>{"Loading"}</div>
      </div>
    );
  }
}

export default LoadingDisplay;
