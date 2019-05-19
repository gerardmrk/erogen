import * as React from "react";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Icon from "@client/views/components/ui.elements/Icon";
import Image from "@client/views/components/ui.elements/Image";
import Dropdown from "@client/views/components/ui.modules/Dropdown";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class UserDropdown extends React.PureComponent<Props, State> {
  private onProfileNavClick = () => {
    if (this.props.profile) {
      this.props.history.push(`/user/${this.props.profile.username}`);
    }
  };

  private onDashboardNavClick = () => {
    this.props.history.push("/dashboard");
  };

  private onSettingsNavClick = () => {
    this.props.history.push("/settings");
  };

  private onLogoutActionClick = () => {
    this.props.logout();
  };

  public render() {
    const trigger = (
      <span>
        {this.props.profile ? (
          <Image avatar={true} src={this.props.profile.username} />
        ) : (
          <Icon name={"user circle outline"} />
        )}
      </span>
    );

    return (
      <Dropdown trigger={trigger} direction={"left"}>
        <Dropdown.Menu direction={"left"}>
          <Dropdown.Header>
            {this.props.profile ? this.props.profile.username : "user"}
          </Dropdown.Header>

          <Dropdown.Divider />

          <Dropdown.Item onClick={this.onProfileNavClick}>
            {"Profile"}
          </Dropdown.Item>

          <Dropdown.Item onClick={this.onDashboardNavClick}>
            {"Dashboard"}
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item onClick={this.onSettingsNavClick}>
            {"Settings"}
          </Dropdown.Item>

          <Dropdown.Item onClick={this.onLogoutActionClick}>
            {"Logout"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
