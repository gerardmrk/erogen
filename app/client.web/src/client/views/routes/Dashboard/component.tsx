import * as React from "react";
import { Heading } from "evergreen-ui/esm/typography";
import styles from "./styles.scss";

type Props = {};

type State = {};

export class Dashboard extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Heading size={700}>{"Dashboard"}</Heading>
      </div>
    );
  }
}

export default Dashboard;
