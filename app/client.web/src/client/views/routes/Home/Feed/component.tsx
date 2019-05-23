import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps } from ".";
import Container from "@client/views/components/ui.elements/Container";

type Props = LocalProps;

type State = {};

export class Feed extends React.PureComponent<Props, State> {
  public render() {
    return (
      <React.Fragment>
        <div className={styles.main}>
          <Container>
            <h1>{"Feed"}</h1>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}