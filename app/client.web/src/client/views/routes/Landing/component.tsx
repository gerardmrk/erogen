import * as React from "react";
import styles from "./component.styles.scss";
import Hero from "./Hero";
import NameDropper from "./NameDropper";
import { LocalProps } from ".";

type Props = LocalProps;

type State = {};

export class Landing extends React.PureComponent<Props, State> {
  public static readonly chunkName = "";
  public static readonly i18nNamespace = "";

  public render() {
    return (
      <div className={styles.main}>
        <Hero />
        <NameDropper />
      </div>
    );
  }
}
