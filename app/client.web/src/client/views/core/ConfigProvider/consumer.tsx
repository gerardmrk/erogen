import * as React from "react";
import { Subtract } from "utility-types";
import { WithConfig } from ".";

export const ConfigContext = React.createContext<WithConfig>({
  devMode: false,
  ssrMode: false,
  publicPath: "/assets/",
  translationsPath: "/assets/i18n/translations/{{lng}}/{{ns}}.json",
  app: {
    appUrl: "https://0.0.0.0:443",
    appName: "App",
    appDescription: "...",
    appKeywords: "app",
    appImagePath: "",
    appTwitterHandle: "",
    appTwitterCardType: "summary_large_image",
    defaultLanguage: "en",
    supportedLanguages: ["en"],
  },
});

export const withConfig = <WrappedComponentProps extends WithConfig>(
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
) => {
  type Props = Subtract<WrappedComponentProps, WithConfig>;
  type State = {};

  return class WrappedWithConfig extends React.PureComponent<Props, State> {
    public static displayName = `wrappedWithConfig(${WrappedComponent.name})`;
    public static readonly WrappedComponent = WrappedComponent;

    public constructor(props) {
      super(props);
    }

    public renderWrappedComponent = (value: WithConfig) => (
      <WrappedComponent {...this.props as any} {...value} />
    );

    public render() {
      return (
        <ConfigContext.Consumer>
          {this.renderWrappedComponent}
        </ConfigContext.Consumer>
      );
    }
  };
};
