import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Icon from "@client/views/components/ui-elements/Icon";
import Image from "@client/views/components/ui-elements/Image";
import Dropdown from "@client/views/components/ui-modules/Dropdown";
import Placeholder from "@client/views/components/ui-elements/Placeholder";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class UserDropdown extends React.PureComponent<Props, State> {
  private onProfileNavClick = () => {
    if (this.props.profile) {
      this.props.history.push(`/user/${this.props.profile.username}`);
    }
  };

  private onDashboardNavClick = () => {
    this.props.history.push("/");
  };

  private onSettingsNavClick = () => {
    this.props.history.push("/settings");
  };

  private onLogoutActionClick = () => {
    this.props.logout();
  };

  public render() {
    const trigger =
      this.props.isLoadingUser || !this.props.profile ? (
        <Icon loading={true} circular={true} bordered={true} name={"spinner"} />
      ) : this.props.profile.displayPicUrl ? (
        <Image
          avatar={true}
          circular={true}
          bordered={true}
          src={this.props.profile.displayPicUrl}
        />
      ) : (
        <Icon circular={true} bordered={true} name={"user outline"} />
      );

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
            {this.props.isLoadingUser || !this.props.profile ? (
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line length={"full"} />
                </Placeholder.Header>
              </Placeholder>
            ) : (
              <span>{this.props.profile.username}</span>
            )}
          </Dropdown.Header>

          <Dropdown.Divider />

          <Dropdown.Item onClick={this.onProfileNavClick}>
            {this.props.t("navs.private.profile")}
          </Dropdown.Item>

          <Dropdown.Item onClick={this.onDashboardNavClick}>
            {this.props.t("navs.private.dashboard")}
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item onClick={this.onSettingsNavClick}>
            {this.props.t("navs.private.settings")}
          </Dropdown.Item>

          <Dropdown.Item onClick={this.onLogoutActionClick}>
            {this.props.t("navs.private.logout")}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
