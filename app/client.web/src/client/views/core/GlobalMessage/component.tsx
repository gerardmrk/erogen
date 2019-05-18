import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/ui.elements/Container";
import Message from "@client/views/components/ui.collections/Message";
import { LocalProps, StoreProps, DispatchProps } from ".";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class GlobalMessage extends React.PureComponent<Props, State> {
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

  // prettier-ignore
  public render() {
    const { msg } = this.props;

    const body = (
      <Container>
        {msg.header && (
          <Message.Header>{msg.header}</Message.Header>
        )}

        {msg.content && (
          <Message.Content>{msg.content}</Message.Content>
        )}

        {msg.list && (
          <Message.List>
            {msg.list.map((item, i) => (
              <Message.Item key={i}>{item}</Message.Item>
            ))}
          </Message.List>
        )}
      </Container>
    );

    if (msg.autoDismiss === false && msg.display) {
      return (
        <div className={styles.main}>
          <Container>
            <Message
              floating={true}
              info={true}
              onDismiss={this.onDismiss}
            >
              {body}
            </Message>
          </Container>
        </div>
      );
    }

    return (
      <div className={styles.main}>
        <Container>
          <Message
            hidden={!msg.display}
            floating={true}
            info={true}
          >
            {body}
          </Message>
        </Container>
      </div>
    );
  }
}
