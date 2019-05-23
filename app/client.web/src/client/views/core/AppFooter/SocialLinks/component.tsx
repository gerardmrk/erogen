import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Icon from "@client/views/components/ui.elements/Icon";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class SocialLinks extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <Icon size={"large"} name={"linkedin"} />
          <Icon size={"large"} name={"instagram"} />
          <Icon size={"large"} name={"youtube"} />
          <Icon size={"large"} name={"twitter"} />
          <Icon size={"large"} name={"facebook official"} />
        </div>
      </div>
    );
  }
}
