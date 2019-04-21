import * as React from "react";
import { ConfigContext } from "./context";

export type Props = {
  config: AppConfig;
};

export type State = {} & AppConfig;

export class ConfigProvider extends React.PureComponent<Props, State> {
  public constructor(props) {
    super(props);
    this.state = { ...props.config };
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
