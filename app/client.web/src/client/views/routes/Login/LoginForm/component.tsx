import * as React from "react";
import Form from "@client/views/components/ui.collections/Form";
import Button from "@client/views/components/ui.elements/Button";
import Checkbox from "@client/views/components/ui.modules/Checkbox";
import styles from "./component.styles.scss";
import { LocalProps } from ".";

type Props = LocalProps;

type State = {};

export class LoginForm extends React.PureComponent<Props, State> {
  public render() {
    return (
      <Form className={styles.main}>
        <Form.Field widths={"equal"}>
          <label>
            <span>{"Username"}</span>
            <Form.Input type={"text"} autoComplete={"username"} fluid={true} />
          </label>
        </Form.Field>

        <Form.Field widths={"equal"}>
          <label>
            <span>{"Password"}</span>
            <Form.Input
              type={"password"}
              autoComplete={"current-password"}
              fluid={true}
            />
          </label>
        </Form.Field>

        <Form.Field>
          <Checkbox label={"Remember Me"} />
        </Form.Field>

        <Button type={"submit"}>{"Login"}</Button>
      </Form>
    );
  }
}
