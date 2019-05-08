import * as React from "react";
import { ConfigContext } from "./consumer";
export { withConfig } from "./consumer";

export type WithConfig = {
  config: {
    app: AppConfig;
    devMode: boolean;
    ssrMode: boolean;
    publicPath: string;
    translationsPath: string;
    untranslatedPath: string;
  };
};

export type Props = WithConfig;

export type State = WithConfig & {};

export class ConfigProvider extends React.PureComponent<Props, State> {
  public constructor(props) {
    super(props);
    this.state = { ...props };
  }

  public render() {
    return (
      <ConfigContext.Provider value={this.state}>
        {this.props.children}
      </ConfigContext.Provider>
    );
  }
}

export default ConfigProvider;
