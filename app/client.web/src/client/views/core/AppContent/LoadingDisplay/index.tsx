import * as React from "react";
import { Pane } from "evergreen-ui";
import { Spinner } from "evergreen-ui";
import styles from "./styles.scss";

type Props = {};

type State = {};

export class LoadingDisplay extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Pane
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={400}
        >
          <Spinner />
        </Pane>
      </div>
    );
  }
}

export default LoadingDisplay;
