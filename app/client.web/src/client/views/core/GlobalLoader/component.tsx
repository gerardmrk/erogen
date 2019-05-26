import * as React from "react";
import styles from "./component.styles.scss";
import Dimmer from "@client/views/components/ui.modules/Dimmer";
import Loader from "@client/views/components/ui.elements/Loader";
import { LocalProps, StoreProps, DispatchProps } from ".";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class GlobalLoader extends React.PureComponent<Props, State> {
  public render() {
    if (!this.props.loading) return null;

    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <Dimmer active={true}>
            <Loader size={"big"}>
              {this.props.message && this.props.t(this.props.message)}
            </Loader>
          </Dimmer>
        </div>
      </div>
    );
  }
}
