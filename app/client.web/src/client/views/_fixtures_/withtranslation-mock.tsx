import * as React from "react";
import { withTranslation, WithTranslation } from "../core/I18nProvider";
import { Namespace } from "react-i18next";
import { Subtract } from "utility-types";
import hoistStatics from "hoist-non-react-statics";
import i18next from "i18next";

type TKeys = string | string[] | TemplateStringsArray;

// prettier-ignore
export const withTranslationMock: typeof withTranslation = (
  ns?: Namespace,
  options?: { withRef?: boolean },
) => <WrappedComponentProps extends WithTranslation>(
  _WrappedComponent: React.ComponentType<WrappedComponentProps>,
) => {
  const WrappedComponent = _WrappedComponent as React.ComponentType<
    WithTranslation
  >;

  type Props = Subtract<WrappedComponentProps, WithTranslation>;
  type State = {};

  class WrappedWithTranslationMock extends React.Component<Props, State> {
    public static displayName = `wrappedWithTranslationMock(${WrappedComponent.name})`;
    public static readonly WrappedComponent = WrappedComponent;

    public constructor(props) {
      super(props)
    }

    private translate = (msg: TKeys | TKeys[]) => {
      return msg as any;
    }

    public render() {
      const i18n: i18next.i18n = {} as i18next.i18n;

      return (
        <WrappedComponent i18n={i18n} tReady={true} t={this.translate} />
      );
    }
  }

  hoistStatics(WrappedWithTranslationMock, WrappedComponent);

  return WrappedWithTranslationMock
};
