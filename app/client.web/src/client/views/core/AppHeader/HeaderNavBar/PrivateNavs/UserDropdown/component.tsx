import * as React from "react";
import styles from "./component.styles.scss";
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
    let trigger;

    if (this.props.isLoadingUser) {
      trigger = (
        <Icon loading={true} bordered={true} circular={true} name={"spinner"} />
      );
    } else if (!this.props.profile) {
      trigger = (
        <Icon bordered={true} circular={true} name={"user circle outline"} />
      );
    } else {
      trigger = (
        <Image
          fluid={true}
          avatar={true}
          bordered={true}
          circular={true}
          src={this.props.profile.displayPicUrl}
        />
      );
    }

    return (
      <Dropdown
        icon={null}
        trigger={trigger}
        direction={"left"}
        pointing={"top"}
      >
        <Dropdown.Menu direction={"left"}>
          <Dropdown.Header
            onClick={this.onProfileNavClick}
            className={styles.dropdownHeader}
          >
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
