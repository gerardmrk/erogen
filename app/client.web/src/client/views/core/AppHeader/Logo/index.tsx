import * as React from "react";
import styles from "./styles.scss";
import logoSVG from "@client/logo.svg";

export default class Logo extends React.PureComponent {
  public render() {
    return (
      <div className={styles.main}>
        <img src={logoSVG} alt={"brand logo"} />
      </div>
    );
  }
}
