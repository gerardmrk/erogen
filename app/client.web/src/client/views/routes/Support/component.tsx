import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/Container";

type Props = {};

type State = {};

export class Support extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Container>
          <h1>{"Support"}</h1>
        </Container>
      </div>
    );
  }
}

export default Support;
