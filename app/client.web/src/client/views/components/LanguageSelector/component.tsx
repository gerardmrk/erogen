import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Dropdown, {
  DropdownProps,
} from "@client/views/components/ui-modules/Dropdown";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class LanguageSelector extends React.PureComponent<Props, State> {
  public constructor(props: Props) {
    super(props);
  }

  private onLanguageChange = async (
    e: React.SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps,
  ) => {
    await this.props.i18n.changeLanguage(value as string);
  };

  public render() {
    const options = this.props.config.app.supportedLanguages.map(
      ([code, lang]) => ({
        key: code,
        text: lang,
        value: code,
      }),
    );

    return (
      <div className={styles.main}>
        <Dropdown
          fluid={true}
          selection={true}
          options={options}
          onChange={this.onLanguageChange}
          value={this.props.i18n.language}
        />
      </div>
    );
  }
}
