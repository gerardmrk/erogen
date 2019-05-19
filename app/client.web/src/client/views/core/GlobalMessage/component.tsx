import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/ui.elements/Container";
import Transition from "@client/views/components/ui.modules/Transition";
import Message, { UiColors } from "@client/views/components/ui.collections/Message"; // prettier-ignore
import Icon, { UiIcons } from "@client/views/components/ui.elements/Icon";
import { MessageLevel } from "@client/store/state/ui-message";
import { LocalProps, StoreProps, DispatchProps } from ".";

const iconMappings = new Map<MessageLevel, UiIcons>([
  [MessageLevel.Pending, "circle notched"],
  [MessageLevel.Info, "info circle"],
  [MessageLevel.Warn, "warning circle"],
  [MessageLevel.Error, "exclamation triangle"],
  [MessageLevel.Success, "check circle"],
  [MessageLevel.Important, "bell outline"],
]);

const colorMappings = new Map<MessageLevel, UiColors | undefined>([
  [MessageLevel.Pending, "teal"],
  [MessageLevel.Info, undefined],
  [MessageLevel.Warn, undefined],
  [MessageLevel.Error, undefined],
  [MessageLevel.Success, undefined],
  [MessageLevel.Important, "pink"],
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

  public render() {
    const { msg } = this.props;

    const onDismissHandler =
      msg.autoDismiss === false ? this.props.hide : undefined;

    return (
      <div className={styles.main}>
        <Transition
          visible={msg.display}
          animation={"fade down"}
          duration={500}
        >
          <Container>
            <Message
              icon={true}
              floating={true}
              info={msg.level === MessageLevel.Info}
              warning={msg.level === MessageLevel.Warn}
              positive={msg.level === MessageLevel.Success}
              negative={msg.level === MessageLevel.Error}
              color={colorMappings.get(msg.level)}
              onDismiss={onDismissHandler}
            >
              <Icon
                name={iconMappings.get(msg.level)}
                loading={msg.level === MessageLevel.Pending}
              />

              <Message.Content>
                {msg.header && <Message.Header>{msg.header}</Message.Header>}

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
              </Message.Content>
            </Message>
          </Container>
        </Transition>
      </div>
    );
  }
}
