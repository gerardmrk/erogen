import * as React from "react";
import Form from "@client/views/components/ui-collections/Form";
import Button from "@client/views/components/ui-elements/Button";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import TextInput from "@client/views/components/EnhancedTextInput";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {
  // form fields
  username: string;
  usernameError: string | undefined;
  usernameLoading: boolean;

  email: string;
  emailError: string | undefined;

  password: string;
  passwordError: string | undefined;

  confirmPassword: string;
  confirmPasswordError: string | undefined;

  agreeToTOS: boolean;
  agreeToTOSError: string | undefined;

  // meta
  loading: boolean;
  forceDisplayErrors: boolean;
  registerSuccess: boolean;
  registerError: string | undefined;
};

const USERNAME_REGEX = /^[a-zA-Z0-9_-]*$/;
const PASSWORD_REGEX = /^(?=.*\d).{8,}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// prettier-ignore
export class RegisterForm extends React.Component<Props, State> {
  public state = {
    username: "",
    usernameError: undefined,
    usernameLoading: false,

    email: "",
    emailError: undefined,

    password: "",
    passwordError: undefined,

    confirmPassword: "",
    confirmPasswordError: undefined,

    agreeToTOS: false,
    agreeToTOSError: undefined,

    loading: true,
    forceDisplayErrors: false,

    registerError: undefined,
    registerSuccess: false,
  };

  public async componentDidUpdate(prevProps: Props) {
    if (!prevProps.tReady && this.props.tReady) {
      this.setState({ loading: false });
    }
  }

  private onUsernameChange = async (value: string) => {
    this.setState({
      username: value,
      usernameLoading: true
    }, async () => {
      this.setState({
        usernameError: await this.validateUsername(value),
        usernameLoading: false,
      })
    });
  };

  private onEmailChange = (value: string) => {
    this.setState({
      email: value,
      emailError: this.validateEmail(value),
    });
  };

  private onPasswordChange = (value: string) => {
    this.setState({
      password: value,
      passwordError: this.validatePassword(value),
    });
  };

  private onConfirmPasswordChange = (value: string) => {
    this.setState({
      confirmPassword: value,
      confirmPasswordError: this.validateConfirmPassword(value),
    });
  };

  private onAgreeToTosChange = () => {
    this.setState({
      agreeToTOS: !this.state.agreeToTOS,
      agreeToTOSError: this.validateAgreeToTOS(!this.state.agreeToTOS),
    });
  };

  private validateUsername = async (value: string) => {
    if (value === "") return this.props.t("form.username-required");
    if (!USERNAME_REGEX.test(value)) return this.props.t("form.username-invalid-chars");
    if (value.length > 35) return this.props.t("form.username-invalid-length", { max: 35 });
    if (await this.props.checkUsernameExists(value)) return this.props.t("form.username-taken");
    return undefined;
  }

  private validateEmail = (value: string) => {
    if (!EMAIL_REGEX.test(value)) return this.props.t("form.email-invalid");
    return undefined;
  }

  private validatePassword = (value: string) => {
    if (value.length < 8) return this.props.t("form.password-invalid-length", { min: 8 });
    if (!PASSWORD_REGEX.test(value)) return this.props.t("form.password-invalid-chars");
    return undefined;
  }

  private validateConfirmPassword = (value: string) => {
    if (value === "") return this.props.t("form.confirm-password-required");
    if (value !== this.state.password) return this.props.t("form.confirm-password-non-matching");
    return undefined;
  }

  private validateAgreeToTOS = (value: boolean) => {
    if (value !== true) return this.props.t("form.agree-to-tos-required");
    return undefined;
  }

  private onRegisterSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (this.state.usernameError) {
      return this.setState({ forceDisplayErrors: true });
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
        <TextInput
          type={"text"}
          id={'register-username'}
          autoComplete={"username"}
          label={this.props.t("form.username-label")}
          error={this.state.usernameError}
          loading={this.state.usernameLoading}
          disabled={this.state.loading}
          onChange={this.onUsernameChange}
          forceDisplayError={this.state.forceDisplayErrors}
        />

        <TextInput
          type={"email"}
          id={"register-email"}
          autoComplete={"email"}
          label={this.props.t("form.email-label")}
          error={this.state.emailError}
          disabled={this.state.loading}
          onChange={this.onEmailChange}
          forceDisplayError={this.state.forceDisplayErrors}
        />

        <TextInput
          type={"password"}
          id={"register-password"}
          autoComplete={"new-password"}
          label={this.props.t("form.password-label")}
          error={this.state.passwordError}
          disabled={this.state.loading}
          onChange={this.onPasswordChange}
          forceDisplayError={this.state.forceDisplayErrors}
        />

        <TextInput
          type={"password"}
          id={"register-confirm-password"}
          autoComplete={"new-password"}
          label={this.props.t("form.confirm-password-label")}
          error={this.state.confirmPasswordError}
          disabled={this.state.loading}
          onChange={this.onConfirmPasswordChange}
          forceDisplayError={this.state.forceDisplayErrors}
        />

        <Form.Field className={styles.actions}>
          <Form.Checkbox
            required={true}
            checked={this.state.agreeToTOS}
            onChange={this.onAgreeToTosChange}
            label={this.props.t("form.agree-to-tos-label")}
            error={!this.state.agreeToTOS}
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
