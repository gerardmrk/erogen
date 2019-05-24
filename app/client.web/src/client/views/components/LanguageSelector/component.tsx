import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Dropdown, {
  DropdownProps,
  DropdownItemProps,
} from "@client/views/components/ui.modules/Dropdown";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class LanguageSelector extends React.PureComponent<Props, State> {
  private options: DropdownItemProps[] = [];

  public constructor(props: Props) {
    super(props);

    this.options = props.config.app.supportedLanguages.map(([code, lang]) => ({
      key: code,
      text: lang,
      value: code,
    }));
  }

  private onLanguageChange = async (
    e: React.SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps,
  ) => {
    await this.props.i18n.changeLanguage(value as string);
  };

  public render() {
    return (
      <div className={styles.main}>
        <Dropdown
          fluid={true}
          selection={true}
          options={this.options}
          onChange={this.onLanguageChange}
          value={this.props.i18n.language}
        />
      </div>
    );
  }
}
