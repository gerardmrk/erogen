import * as React from "react";
import styles from "./component.styles.scss";

type Props = {
  className?: string;
};

type State = {};

export class Container extends React.PureComponent<Props, State> {
  public static defaultProps = {
    className: "",
  };

  public render() {
    const { className } = this.props;
    // prettier-ignore
    return (
      <div className={`${styles.main} ${className}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
