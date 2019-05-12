import * as React from "react";
import i18next from "i18next";
import hoistStatics from "hoist-non-react-statics";
import {
  I18nextProvider,
  WithTranslation as _WithTranslation,
  withTranslation as _withTranslation,
  Namespace,
} from "react-i18next";

type Props = {
  i18n: i18next.i18n;
};

type State = {};

export class I18nProvider extends React.Component<Props, State> {
  public render() {
    return (
      <I18nextProvider i18n={this.props.i18n}>
        {this.props.children}
      </I18nextProvider>
    );
  }
}

export type WithTranslation = _WithTranslation;

// prettier-ignore
export const withTranslation = (
  ns?: Namespace,
  options?: { withRef?: boolean; }
) => <WrappedComponentProps extends WithTranslation>(
  _WrappedComponent: React.ComponentType<WrappedComponentProps>
) => {
  const WrappedComponent = _WrappedComponent as React.ComponentType<WithTranslation>;

  return hoistStatics(
    _withTranslation(ns, options)(WrappedComponent),
    WrappedComponent
  )
}
