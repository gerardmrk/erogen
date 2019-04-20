import * as React from "react";
import { Card } from "semantic-ui-react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import AuthNavs from "./AuthNavs";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class AuthRoutesWrapper extends React.PureComponent<Props, State> {
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
              <div className={styles.content}>
                {this.props.children}
                <AuthNavs />
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}

export default AuthRoutesWrapper;
