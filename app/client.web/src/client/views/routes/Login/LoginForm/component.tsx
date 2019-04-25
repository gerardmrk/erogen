import * as React from "react";
import Form from "@client/views/components/ui.collections/Form";
import styles from "./component.styles.scss";

type Props = {};

type State = {};

export class LoginForm extends React.PureComponent<Props, State> {
  public render() {
    return (
      <Form className={styles.main}>
        <Form.Group widths={"equal"}>
          <Form.Input type={"text"} autoComplete={"username"} fluid={true} />
        </Form.Group>

        <Form.Group widths={"equal"}>
          <Form.Input
            type={"password"}
            autoComplete={"current-password"}
            fluid={true}
          />
        </Form.Group>
      </Form>
    );
  }
}
