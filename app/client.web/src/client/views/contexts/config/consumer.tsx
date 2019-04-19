import * as React from "react";
import { Subtract } from "utility-types";
import { ConfigContext } from "./context";

export type InjectedConfig = {
  config: AppConfig;
};

export const withConfig = <WrappedComponentProps extends InjectedConfig>(
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
) => {
  type Props = Subtract<WrappedComponentProps, InjectedConfig>;
  type State = {};

  return class WithConfig extends React.PureComponent<Props, State> {
    public static displayName = `withConfig(${WrappedComponent.name})`;
    public static readonly WrappedComponent = WrappedComponent;

    public renderWrappedComponent = (config: AppConfig) => (
      <WrappedComponent {...this.props as any} config={config} />
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
