import * as React from "react";
import { LocalProps } from ".";
import Form from "@client/views/components/ui-collections/Form";
import Input from "@client/views/components/ui-elements/Input";
import styles from "./component.styles.scss";

export type Props = LocalProps;

export type State = {};

export class EnhancedInput extends React.PureComponent<Props, State> {
  public constructor(props: Props) {
    super(props);
  }

  public render() {
    return <Form.Field></Form.Field>;
  }
}
