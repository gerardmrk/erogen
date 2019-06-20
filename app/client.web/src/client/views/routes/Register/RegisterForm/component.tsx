import * as React from "react";
import Form from "@client/views/components/ui.collections/Form";
import Input from "@client/views/components/ui.elements/Input";
import Button from "@client/views/components/ui.elements/Button";
import Checkbox from "@client/views/components/ui.modules/Checkbox";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import NavLink from "@client/views/components/EnhancedNavLink";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTOS: boolean;
};

export class RegisterForm extends React.Component<Props, State> {
  public state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTOS: false,
  };

  private onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.currentTarget.value });
  };

  private onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.currentTarget.value });
  };

  private onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.currentTarget.value });
  };

  private onConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ confirmPassword: e.currentTarget.value });
  };

  private onAgreeToTosChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ agreeToTOS: !this.state.agreeToTOS });
  };

  private onRegisterSubmit = () => {
    // this.props.login(
    //   this.state.alias,
    //   this.state.password,
    //   this.state.remember,
    // );
  };

  public render() {
    return (
      <Form className={styles.main}>
        <Form.Field widths={"equal"}>
          <label htmlFor={"register-username"}>
            {this.props.t("form.username-label")}
          </label>
          <Input
            fluid={true}
            type={"text"}
            id={"register-username"}
            autoComplete={"username"}
            value={this.state.username}
            onChange={this.onUsernameChange}
          />
        </Form.Field>

        <Form.Field widths={"equal"}>
          <label htmlFor={"register-email"}>
            {this.props.t("form.email-label")}
          </label>
          <Input
            fluid={true}
            type={"email"}
            id={"register-email"}
            autoComplete={"email"}
            value={this.state.email}
            onChange={this.onEmailChange}
          />
        </Form.Field>

        <Form.Field widths={"equal"}>
          <label htmlFor={"register-password"}>
            {this.props.t("form.password-label")}
          </label>
          <Input
            fluid={true}
            type={"password"}
            id={"register-password"}
            autoComplete={"new-password"}
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
        </Form.Field>

        <Form.Field widths={"equal"}>
          <label htmlFor={"register-confirm-password"}>
            {this.props.t("form.confirm-password-label")}
          </label>
          <Input
            fluid={true}
            type={"password"}
            id={"register-confirm-password"}
            autoComplete={"new-password"}
            value={this.state.confirmPassword}
            onChange={this.onConfirmPasswordChange}
          />
        </Form.Field>

        <Form.Field className={styles.actions}>
          <Checkbox
            label={this.props.t("form.agree-to-tos-label")}
            checked={this.state.agreeToTOS}
            onChange={this.onAgreeToTosChange}
          />
        </Form.Field>

        <Form.Field widths={"equal"}>
          <Button fluid={true} type={"submit"} onClick={this.onRegisterSubmit}>
            {this.props.t("form.register-action")}
          </Button>
        </Form.Field>
      </Form>
    );
  }
}
