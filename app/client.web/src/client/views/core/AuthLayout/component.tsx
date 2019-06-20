import * as React from "react";
import Card from "@client/views/components/ui-views/Card";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class AuthLayout extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <Card fluid={true}>
            <Card.Content className={styles.header}>
              <Card.Header>
                <h1>{this.props.title}</h1>
              </Card.Header>
            </Card.Content>

            <Card.Content>
              <div className={styles.content}>{this.props.children}</div>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}
