import * as React from "react";
import { Heading } from "evergreen-ui";
import styles from "./styles.scss";

type Props = {};

type State = {};

export class Documentation extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Heading size={700}>{"Documentation"}</Heading>
      </div>
    );
  }
}

export default Documentation;
