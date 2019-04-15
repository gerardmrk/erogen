import * as React from "react";
import styles from "./styles.scss";
import logoSVG from "@client/logo.svg";
import { Link } from "react-router-dom";
import { DEFAULT_PUBLIC_PATH } from "@client/views/conf.routes";

export default class Logo extends React.PureComponent {
  public render() {
    return (
      <div className={styles.main}>
        <Link to={DEFAULT_PUBLIC_PATH}>
          <img src={logoSVG} alt={"brand logo"} />
        </Link>
      </div>
    );
  }
}
