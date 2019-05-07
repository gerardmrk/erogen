import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { LocalProps, StoreProps, DispatchProps } from ".";
import i18next from "i18next";
import Backend from "i18next-xhr-backend";
import Cache from "i18next-localstorage-cache";
import LangDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

// prettier-ignore
export class I18nProvider extends React.Component<Props, State> {
  private i18n: i18next.i18n;

  public constructor(props: Props) {
    super(props);

    this.i18n = i18next
      .use(Backend)
      .use(Cache)
      .use(LangDetector)
      .use(initReactI18next);
  }

  public async componentDidMount() {
    const { config } = this.props
    await this.i18n.init({
      load: "languageOnly",
      fallbackLng: config.defaultLanguage,
      keySeparator: false,
      react: {
        useSuspense: false,
      },
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: `${config.publicPath}/i18n/translations/{{lng}}/{{ns}}.json`,
      },
    });
  }

  public render() {
    return (
      <I18nextProvider i18n={this.i18n}>
        {this.props.children}
      </I18nextProvider>
    );
  }
}
