import * as React from "react";
import styles from "./styles.scss";
import logoSVG from "@client/logo.svg";

type Props = {
  height?: number;
};

export default class Logo extends React.PureComponent<Props> {
  public static defaultProps = {
    height: 30,
  };

  public render() {
    return (
      <div className={styles.main}>
        <img src={logoSVG} alt={"brand logo"} height={this.props.height} />
      </div>
    );
  }
}
