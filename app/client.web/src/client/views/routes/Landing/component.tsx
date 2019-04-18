import * as React from "react";
import styles from "./styles.scss";
import Hero from "./Hero";
import NameDropper from "./NameDropper";
import { LocalProps } from ".";

type Props = LocalProps;

type State = {};

export class Landing extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Hero />
        <NameDropper />
      </div>
    );
  }
}

export default Landing;
