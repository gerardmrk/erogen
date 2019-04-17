import * as React from "react";
import { Heading } from "evergreen-ui/esm/typography";
import styles from "./styles.scss";

type Props = {};

type State = {};

export class Profile extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Heading size={700}>{"Profile"}</Heading>
      </div>
    );
  }
}

export default Profile;
