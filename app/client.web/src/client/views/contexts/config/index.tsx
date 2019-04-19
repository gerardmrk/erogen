import * as React from "react";
import { AppConfigContext } from "./context";

export type Props = {
  config: AppConfig;
};

export type State = {} & AppConfig;

export class ConfigProvider extends React.PureComponent<Props, State> {
  public constructor(props) {
    super(props);
    this.state = { ...props };
  }

  public render() {
    return (
      <AppConfigContext.Provider value={this.state}>
        {this.props.children}
      </AppConfigContext.Provider>
    );
  }
}
