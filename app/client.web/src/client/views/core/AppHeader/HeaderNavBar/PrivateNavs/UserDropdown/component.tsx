import * as React from "react";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Dropdown from "@client/views/components/ui.modules/Dropdown";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class UserDropdown extends React.PureComponent<Props, State> {
  private onLogoutClick = () => {
    this.props.logout();
  };

  public render() {
    return (
      <Dropdown icon={"user circle"}>
        <Dropdown.Menu>
          <Dropdown.Header>{"User"}</Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item>{"Settings"}</Dropdown.Item>
          <Dropdown.Item onClick={this.onLogoutClick}>{"Logout"}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
