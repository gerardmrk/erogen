import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/ui.elements/Container";
import Message from "@client/views/components/ui.collections/Message";
import { LocalProps, StoreProps, DispatchProps } from ".";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class GlobalMessage extends React.PureComponent<Props, State> {
  public componentDidMount() {}

  public componentDidUpdate(prevProps: Props) {
    if (this.props.msg.display && this.props.msg.autoDismiss !== false) {
      setTimeout(() => {
        this.props.hide();
      }, this.props.msg.autoDismiss);
    }
  }

  private onDismiss = () => {
    this.props.hide();
  };

  public render() {
    const { msg } = this.props;

    if (msg.autoDismiss === false && msg.display) {
      return (
        <div className={styles.main}>
          <Message floating={true} info={true} onDismiss={this.onDismiss}>
            <Container text={true}>
              <Message.Header>{"HELLO"}</Message.Header>
              <Message.Content>{"HELLO"}</Message.Content>
            </Container>
          </Message>
        </div>
      );
    }

    return (
      <div className={styles.main}>
        <Message hidden={!msg.display} floating={true} info={true}>
          <Container text={true}>
            <Message.Header>{"AUTODISMISS"}</Message.Header>
            <Message.Content>{"AUTODISMISS"}</Message.Content>
          </Container>
        </Message>
      </div>
    );
  }
}
