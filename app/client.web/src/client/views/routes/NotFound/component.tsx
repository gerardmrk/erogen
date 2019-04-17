import * as React from "react";
import styles from "./styles.scss";
import Container from "@client/views/components/Container";

type Props = {};

type State = {};

export class NotFound extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Container className={styles.container}>
          <h1>{"404"}</h1>
          <p>{"The page you requested does not exist."}</p>
        </Container>
      </div>
    );
  }
}

export default NotFound;
