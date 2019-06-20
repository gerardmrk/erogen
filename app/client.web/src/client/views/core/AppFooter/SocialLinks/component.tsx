import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import Icon from "@client/views/components/ui-elements/Icon";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class SocialLinks extends React.PureComponent<Props, State> {
  public render() {
    const { socialLinks } = this.props.config.app;
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener">
              <Icon size={"large"} name={"linkedin"} />
            </a>
          )}

          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener">
              <Icon size={"large"} name={"instagram"} link={true} />
            </a>
          )}

          {socialLinks.youtube && (
            <a href={socialLinks.youtube} target="_blank" rel="noopener">
              <Icon size={"large"} name={"youtube"} />
            </a>
          )}

          {socialLinks.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noopener">
              <Icon size={"large"} name={"twitter"} />
            </a>
          )}

          {socialLinks.facebook && (
            <a href={socialLinks.facebook} target="_blank" rel="noopener">
              <Icon size={"large"} name={"facebook official"} />
            </a>
          )}
        </div>
      </div>
    );
  }
}
