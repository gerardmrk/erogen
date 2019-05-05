import * as React from "react";
import styles from "./component.styles.scss";

type Props = {};

type State = {};

export class ProfileSettings extends React.PureComponent<Props, State> {
  public static readonly chunkName = "";
  public static readonly i18nNamespace = "";

  public render() {
    return (
      <div className={styles.main}>
        <h1>{"ProfileSettings"}</h1>
      </div>
    );
  }
}

export default ProfileSettings;
