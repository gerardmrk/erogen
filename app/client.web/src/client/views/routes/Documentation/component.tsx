import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/ui.elements/Container";

type Props = {};

type State = {};

export class Documentation extends React.PureComponent<Props, State> {
  public static readonly chunkName = "";
  public static readonly i18nNamespace = "";

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
