import * as React from "react";
import styles from "./component.styles.scss";
import { Link } from "react-router-dom";
import logo from "@client/logo.svg";
import { DEFAULT_PUBLIC_PATH } from "@client/views/conf.routes";
import { LocalProps } from ".";

export type Props = LocalProps & {};

export type State = {};

export class Logo extends React.PureComponent<Props, State> {
  public constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className={styles.main}>
        <Link to={DEFAULT_PUBLIC_PATH}>
          <img src={logo} alt={"brand logo"} />
        </Link>
      </div>
    );
  }
}
