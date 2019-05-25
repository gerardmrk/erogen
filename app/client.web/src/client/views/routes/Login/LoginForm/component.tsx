import * as React from "react";
import Form from "@client/views/components/ui.collections/Form";
import Input from "@client/views/components/ui.elements/Input";
import Button from "@client/views/components/ui.elements/Button";
import Checkbox from "@client/views/components/ui.modules/Checkbox";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {
  alias: string;
  password: string;
  remember: boolean;
};

export class LoginForm extends React.PureComponent<Props, State> {
  public state = {
    alias: "",
    password: "",
    remember: false,
  };

  private onAliasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ alias: e.currentTarget.value });
  };

  private onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value });
  };

  private onRememberChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ remember: !this.state.remember });
  };

  private onLoginSubmit = () => {
    this.props.login(
      this.state.alias,
      this.state.password,
      this.state.remember,
    );
  };

  public render() {
    return (
      <Form className={styles.main}>
        <Form.Field widths={"equal"}>
          <label>
            <span>{this.props.t("form-label-username")}</span>
            <Input
              fluid={true}
              type={"text"}
              autoComplete={"username"}
              value={this.state.alias}
              onChange={this.onAliasChange}
            />
          </label>
        </Form.Field>

        <Form.Field widths={"equal"}>
          <label>
            <span>{this.props.t("form-label-password")}</span>
            <Input
              fluid={true}
              type={"password"}
              autoComplete={"current-password"}
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
          </label>
        </Form.Field>

        <Form.Field>
          <Checkbox
            label={this.props.t("form-label-remember")}
            checked={this.state.remember}
            onChange={this.onRememberChange}
          />
        </Form.Field>

        <Button type={"submit"} onClick={this.onLoginSubmit}>
          {this.props.t("form-heading")}
        </Button>
      </Form>
    );
  }
}
