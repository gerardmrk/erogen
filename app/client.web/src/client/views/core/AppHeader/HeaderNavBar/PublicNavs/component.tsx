import * as React from "react";
import { Text, Card, Pane } from "evergreen-ui";
import styles from "./styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import NavLink from "@client/views/components/NavLink";
import { LOGIN_PATH, REGISTER_PATH } from "@client/views/conf.routes";
import { headerNavsPublic } from "@client/views/conf.navs";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class PublicNavs extends React.PureComponent<Props, State> {
  public render() {
    return (
      <nav className={styles.main}>
        <Pane>
          {headerNavsPublic.map((n, i) => (
            <NavLink key={i} path={n.to} label={n.label} />
          ))}
        </Pane>

        <Pane display={"flex"} justifyContent={"space-between"}>
          <Card>
            <NavLink path={LOGIN_PATH} label={"Login"} />
          </Card>

          <Text>{"/"}</Text>

          <Card>
            <NavLink path={REGISTER_PATH} label={"Register"} />
          </Card>
        </Pane>
      </nav>
    );
  }
}

export default PublicNavs;
