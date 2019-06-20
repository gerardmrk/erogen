import * as React from "react";
import Form from "@client/views/components/ui-collections/Form";
import Input from "@client/views/components/ui-elements/Input";
import Button from "@client/views/components/ui-elements/Button";
import Checkbox from "@client/views/components/ui-modules/Checkbox";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {
  // form fields
  username: string;
  usernameTouched: boolean;
  usernameError: string | undefined;

  email: string;
  emailTouched: boolean;
  emailError: string | undefined;

  password: string;
  passwordTouched: boolean;
  passwordError: string | undefined;

  confirmPassword: string;
  confirmPasswordTouched: boolean;
  confirmPasswordError: string | undefined;

  agreeToTOS: boolean;
  agreeToTOSTouched: boolean;
  agreeToTOSError: string | undefined;

  // meta
  loading: boolean;
  showAllErrors: boolean;
  registerError: string | undefined;
  registerSuccess: boolean;
};

// prettier-ignore
export class RegisterForm extends React.Component<Props, State> {
  public state = {
    username: "",
    usernameTouched: false,
    usernameError: "form.username-required",

    email: "",
    emailTouched: false,
    emailError: "form.email-required",

    password: "",
    passwordTouched: false,
    passwordError: "form.password-required",

    confirmPassword: "",
    confirmPasswordTouched: false,
    confirmPasswordError: "form.confirm-password-required",

    agreeToTOS: false,
    agreeToTOSTouched: false,
    agreeToTOSError: "form.agree-to-tos-required",

    loading: false,
    showAllErrors: false,
    registerError: undefined,
    registerSuccess: false,
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

  private onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ confirmPassword: e.currentTarget.value });
  };

  private onAgreeToTosChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ agreeToTOS: !this.state.agreeToTOS });
  };

  private onUsernameBlur = () => {
    this.setState({
      usernameTouched: true,
      usernameError: validateUsername(this.state.username),
    });
  }

  private onEmailBlur = () => {
    this.setState({
      emailTouched: true,
      emailError: validateEmail(this.state.email),
    });
  }

  private onPasswordBlur = () => {
    this.setState({
      passwordTouched: true,
      passwordError: validatePassword(this.state.password),
    });
  }

  private onConfirmPasswordBlur = () => {
    this.setState({
      confirmPasswordTouched: true,
      confirmPasswordError: validateConfirmPassword(
        this.state.confirmPassword,
        this.state.password,
      ),
    });
  }

  private onAgreeToTOSBlur = () => {
    this.setState({
      agreeToTOSTouched: true,
      agreeToTOSError: validateAgreeToTOS(this.state.agreeToTOS),
    })
  }

  private onRegisterSubmit = () => {
    if (
      !!this.state.usernameError ||
      !!this.state.emailError ||
      !!this.state.passwordError ||
      !!this.state.confirmPasswordError ||
      !!this.state.agreeToTOSError
    ) {
      return this.setState({ showAllErrors: true });
    }
    
    this.setState({ loading: true });

    this.props.register({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }, (err: Error | null) => {
      this.setState({
        loading: false,
        registerSuccess: !err,
        registerError: err ? err.message : undefined
      });
    });
  };

  public render() {
    if (this.state.registerSuccess && !this.state.loading) {
      return <span>{'SUCCESS'}</span>
    }

    return (
      <Form className={styles.main} loading={this.state.loading}>
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
            onBlur={this.onUsernameBlur}
            error={!!this.state.usernameError}
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
            onBlur={this.onEmailBlur}
            error={!!this.state.emailError}
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
            onBlur={this.onPasswordBlur}
            error={!!this.state.passwordError}
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
            onBlur={this.onConfirmPasswordBlur}
            error={!!this.state.confirmPasswordError}
          />
        </Form.Field>

        <Form.Field className={styles.actions}>
          <Checkbox
            checked={this.state.agreeToTOS}
            onChange={this.onAgreeToTosChange}
            onBlur={this.onAgreeToTOSBlur}
            label={this.props.t("form.agree-to-tos-label")}
          />
        </Form.Field>

        <Form.Field widths={"equal"}>
          <Button
            fluid={true}
            type={"submit"}
            onClick={this.onRegisterSubmit}
          >
            {this.props.t("form.register-action")}
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

function validateUsername(username: string): string | undefined {
  if (username.trim() === "") {
    return "form.username-required";
  }

  if (username.length < 3 || username.length > 35) {
    return "form.invalid-username-length";
  }
  return undefined;
}

function validateEmail(email: string): string | undefined {
  if (email.trim() === "") {
    return "form.email-required";
  }
  return undefined;
}

function validatePassword(password: string): string | undefined {
  if (password.length < 8) {
    return "form.invalid-password-length";
  }
  return undefined;
}

function validateConfirmPassword(
  reentered: string,
  original: string,
): string | undefined {
  if (reentered !== original) {
    return "form.invalid-password-match";
  }
  return undefined;
}

function validateAgreeToTOS(checked: boolean) {
  if (checked !== true) {
    return "form.agree-to-tos-required";
  }
  return undefined;
}
