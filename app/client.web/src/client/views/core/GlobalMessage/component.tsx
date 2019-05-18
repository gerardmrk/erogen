import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/ui.elements/Container";
import Message, { UiColors } from "@client/views/components/ui.collections/Message"; // prettier-ignore
import Icon, { UiIcons } from "@client/views/components/ui.elements/Icon";
import { MessageLevel } from "@client/store/state/global-ui-message";
import { LocalProps, StoreProps, DispatchProps } from ".";

const iconMappings = new Map<MessageLevel, UiIcons>([
  [MessageLevel.Pending, "circle notched"],
  [MessageLevel.Info, "info circle"],
  [MessageLevel.Warn, "warning circle"],
  [MessageLevel.Error, "exclamation triangle"],
  [MessageLevel.Success, "check circle"],
  [MessageLevel.Failure, "exclamation triangle"],
  [MessageLevel.Important, "bell outline"],
]);

const colorMappings = new Map<MessageLevel, UiColors>([
  [MessageLevel.Pending, "teal"],
  [MessageLevel.Info, "blue"],
  [MessageLevel.Warn, "yellow"],
  [MessageLevel.Error, "red"],
  [MessageLevel.Success, "green"],
  [MessageLevel.Failure, "orange"],
  [MessageLevel.Important, "purple"],
]);

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

  // prettier-ignore
  public render() {
    const { msg } = this.props;

    const onDismissHandler = msg.autoDismiss === false
      ? this.props.hide
      : undefined;

    return (
      <div className={styles.main}>
        <Container>
          <Message
            icon={true}
            hidden={!msg.display}
            floating={true}
            color={colorMappings.get(msg.level)}
            onDismiss={onDismissHandler}
          >
            <Icon
              name={iconMappings.get(msg.level)}
              loading={msg.level === MessageLevel.Pending}
            />

            <Message.Content>
              {msg.header && (
                <Message.Header>
                  {msg.header}
                </Message.Header>
              )}

              {msg.content && (
                <Message.Content>
                  {msg.content}
                </Message.Content>
              )}

              {msg.list && (
                <Message.List>
                  {msg.list.map((item, i) => (
                    <Message.Item key={i}>{item}</Message.Item>
                  ))}
                </Message.List>
              )}
            </Message.Content>
          </Message>
        </Container>
      </div>
    );
  }
}
