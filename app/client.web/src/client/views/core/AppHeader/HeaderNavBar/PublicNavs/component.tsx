import * as React from "react";
import { Text } from "evergreen-ui";
import styles from "./styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import NavLink from "@client/views/components/NavLink";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class PublicNavs extends React.PureComponent<Props, State> {
  public render() {
    return (
      <nav className={styles.main}>
        <div>
          <NavLink path={"/login"} label={"Login"} />
          <Text>{"/"}</Text>
          <NavLink path={"/register"} label={"Register"} />
        </div>
      </nav>
    );
  }
}

export default PublicNavs;
