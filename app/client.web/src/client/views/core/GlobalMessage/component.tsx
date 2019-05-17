import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/ui.elements/Container";
import Message from "@client/views/components/ui.collections/Message";
import { LocalProps, StoreProps, DispatchProps } from ".";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class GlobalMessage extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Container>
          <Message>
            <Message.Header>{"HELLO"}</Message.Header>
            <Message.Content>{"HELLO"}</Message.Content>
          </Message>
        </Container>
      </div>
    );
  }
}
