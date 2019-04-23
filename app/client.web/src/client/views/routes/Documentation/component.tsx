import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/Container";

type Props = {};

type State = {};

export class Documentation extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Container>
          <h1>{"Documentation"}</h1>
        </Container>
      </div>
    );
  }
}
