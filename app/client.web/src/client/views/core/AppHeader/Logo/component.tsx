import * as React from "react";
import styles from "./component.styles.scss";
import logo from "@client/logo.svg";
import { LocalProps } from ".";
import NavLink from "@client/views/components/EnhancedNavLink";

export type Props = LocalProps & {};

export type State = {};

export class Logo extends React.PureComponent<Props, State> {
  public constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className={styles.main}>
        <NavLink disableActiveStyle={true} to={"/"}>
          <img src={logo} alt={"brand logo"} />
        </NavLink>
      </div>
    );
  }
}
