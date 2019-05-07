import { connect } from "react-redux";
import { State, Dispatcher } from "@client/store";
import { I18nProvider } from "./component";
import { withConfig, WithConfig } from "@client/views/core/ConfigProvider";

export type LocalProps = WithConfig & {};

export type StoreProps = {};

export type DispatchProps = {};

const mapStateToProps = (state: State, localProps: LocalProps) => ({});

const mapDispatchToProps = (
  dispatch: Dispatcher,
  localProps: LocalProps,
) => ({});

export default withConfig(
  connect<StoreProps, DispatchProps, LocalProps, State>(
    mapStateToProps,
    mapDispatchToProps,
  )(I18nProvider),
);
