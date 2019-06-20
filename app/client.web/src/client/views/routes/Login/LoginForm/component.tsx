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
          <label htmlFor={"login-alias"}>
            {this.props.t("form.username-label")}
          </label>
          <Input
            fluid={true}
            type={"text"}
            id={"login-alias"}
            autoComplete={"username"}
            value={this.state.alias}
            onChange={this.onAliasChange}
          />
        </Form.Field>

        <Form.Field widths={"equal"}>
          <label htmlFor={"login-password"}>
            {this.props.t("form.password-label")}
          </label>
          <Input
            fluid={true}
            type={"password"}
            id={"login-password"}
            autoComplete={"current-password"}
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
        </Form.Field>

        <Form.Field className={styles.actions}>
          <Checkbox
            label={this.props.t("form.remember-label")}
            checked={this.state.remember}
            onChange={this.onRememberChange}
          />

          <NavLink to={"/forgot-password"}>
            {this.props.t("form.forgot-password")}
          </NavLink>
        </Form.Field>

        <Form.Field widths={"equal"}>
          <Button fluid={true} type={"submit"} onClick={this.onLoginSubmit}>
            {this.props.t("form.login-action")}
          </Button>
        </Form.Field>
      </Form>
    );
  }
}
