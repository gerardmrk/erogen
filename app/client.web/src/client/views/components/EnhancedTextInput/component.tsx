import * as React from "react";
import Form from "@client/views/components/ui-collections/Form";
import Input from "@client/views/components/ui-elements/Input";
import styles from "./component.styles.scss";
import { debounce } from "@client/utils/debounce";

export type Props = {
  id: string;
  type?: string;
  label: string;
  loading?: boolean;
  inputType?: string;
  autoComplete?: string;
  initialValue?: string;
  error?: string | undefined;
  disabled?: boolean;
  forceDisplayError?: boolean;
  onChange: (value: string) => void;
};

export type State = {
  value: string;
  dirty: boolean;
  touched: boolean;
};

// prettier-ignore
export class EnhancedTextInput extends React.Component<Props, State> {
  public static defaultProps = {
    type: "text",
    initialValue: "",
  }

  private delayedOnChange: () => void;

  public constructor(props: Props) {
    super(props);

    this.state = {
      value: props.initialValue as string,
      dirty: false,
      touched: false,
    };

    this.delayedOnChange = debounce(() => {
      this.props.onChange(this.state.value)
    }, 550);
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.disabled !== this.props.disabled) {
      this.props.onChange(this.state.value);
    }
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      touched: true,
      dirty: true,
      value: e.currentTarget.value,
    }, this.delayedOnChange);
  };

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
          error={!!this.props.error && (this.state.dirty || this.props.forceDisplayError)}
          disabled={this.props.disabled}
          loading={this.props.loading}
        />

        {!!this.props.error && (this.state.dirty || this.props.forceDisplayError) && (
          <div className={styles.invalidation}>
            <span>
              {this.props.error}
            </span>
          </div>
        )}
      </Form.Field>
    );
  }
}
