import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/ui.elements/Container";

type Props = {};

type State = {};

export class ServerError extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Container className={styles.container}>
          <h1>{"500"}</h1>
          <p>{"Internal Server Error"}</p>
        </Container>
      </div>
    );
  }
}

export default ServerError;
