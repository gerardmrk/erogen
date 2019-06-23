import * as React from "react";
import Form from "@client/views/components/ui-collections/Form";
import Message from "@client/views/components/ui-collections/Message";
import Input from "@client/views/components/ui-elements/Input";
import styles from "./component.styles.scss";

export type Props = {
  id: string;
  type?: string;
  label: string;
  inputType?: string;
  autoComplete?: string;
  initialValue?: string;
  disabled?: boolean;
  forceDisplayError?: boolean;
  onChange: (value: string, isValid: boolean) => void;
  validate: (value: string) => string | undefined;
};

export type State = {
  value: string;
  dirty: boolean;
  touched: boolean;
  error: string | undefined;
};

// prettier-ignore
export class EnhancedTextInput extends React.Component<Props, State> {
  public static defaultProps = {
    type: "text",
    initialValue: "",
  }

  public constructor(props: Props) {
    super(props);

    this.state = {
      value: props.initialValue as string,
      dirty: false,
      touched: false,
      error: undefined
    };
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {

    if (prevProps.disabled !== this.props.disabled) {
      const invalidation = this.props.validate(this.state.value);
      this.setState({ error: invalidation }, () => {
        this.props.onChange(this.state.value, !invalidation);
      });
    }
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ touched: true, value: e.currentTarget.value });
  };

  private onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const invalidation = this.props.validate(this.state.value);

    this.setState({
      error: invalidation,
      dirty: this.state.touched && this.state.value !== "",
    }, () => {
      this.props.onChange(this.state.value, !!invalidation);
    });
  }

  public render() {
    return (
      <Form.Field widths={'equal'}>
        <label htmlFor={this.props.id}>
          {this.props.label}
        </label>

        <Input
          id={this.props.id}
          fluid={true}
          type={this.props.type}
          autoComplete={this.props.autoComplete}
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          error={!!this.state.error && (this.state.dirty || this.props.forceDisplayError)}
          disabled={this.props.disabled}
        />

        <Message
          error={true}
          size={'mini'}
          className={styles.message}
          content={this.state.error}
          visible={!!this.state.error && (this.state.dirty || this.props.forceDisplayError)}
        />
      </Form.Field>
    );
  }
}
