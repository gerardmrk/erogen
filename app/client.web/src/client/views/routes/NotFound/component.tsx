import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/ui.elements/Container";

type Props = {};

type State = {};

export class NotFound extends React.PureComponent<Props, State> {
  public static readonly chunkName = "";
  public static readonly i18nNamespace = "";

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
