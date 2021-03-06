import * as React from "react";
import { Subtract } from "utility-types";
import hoistStatics from "hoist-non-react-statics";
import { WithConfig } from ".";

export const ConfigContext = React.createContext<WithConfig>({
  config: {
    devMode: false,
    ssrMode: false,
    publicPath: "/assets/",
    translationsPath: "/assets/i18n/translations/{{lng}}/{{ns}}.json",
    untranslatedPath: "/assets/i18n/translations/en/{{ns}}.json",
    app: {
      appUrl: "https://0.0.0.0:443",
      appName: "App",
      appDescription: "...",
      appKeywords: "app",
      appImagePath: "",
      appTwitterHandle: "",
      appTwitterCardType: "summary_large_image",
      defaultLanguage: "en",
      supportedLanguages: [["en", "English"]],
      copyright: "",
      siteMap: {},
      socialLinks: {},
    },
  },
});

// prettier-ignore
export const withConfig = <WrappedComponentProps extends WithConfig>(_WrappedComponent: React.ComponentType<WrappedComponentProps>) => {
  const WrappedComponent = _WrappedComponent as React.ComponentType<WithConfig>;

  type Props = Subtract<WrappedComponentProps, WithConfig>;
  type State = {};

  class WrappedWithConfig extends React.PureComponent<Props, State> {
    public static displayName = `wrappedWithConfig(${WrappedComponent.name})`;
    public static readonly WrappedComponent = WrappedComponent;

    public constructor(props) {
      super(props);
    }

    public renderWrappedComponent = (injected: WithConfig) => (
      <WrappedComponent
        {...this.props}
        {...injected}
      />
    );

    public render() {
      return (
        <ConfigContext.Consumer>
          {this.renderWrappedComponent}
        </ConfigContext.Consumer>
      );
    }
  };

  hoistStatics(WrappedWithConfig, WrappedComponent);

  return WrappedWithConfig;
};
