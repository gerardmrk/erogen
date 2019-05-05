import * as React from "react";
import styles from "./component.styles.scss";

type Props = {};

type State = {};

export class Profile extends React.PureComponent<Props, State> {
  public static readonly chunkName = "";
  public static readonly i18nNamespace = "";

  public render() {
    return (
      <div className={styles.main}>
        <h1>{"Profile"}</h1>
      </div>
    );
  }
}

export default Profile;
