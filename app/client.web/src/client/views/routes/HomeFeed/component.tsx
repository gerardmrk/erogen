import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps } from ".";
import HeadTags from "@client/views/components/HeadTags";

type Props = LocalProps;

type State = {};

export class HomeFeed extends React.PureComponent<Props, State> {
  public static i18nNamespace = "route_HomeFeed";

  public render() {
    return (
      <React.Fragment>
        <HeadTags
          path={this.props.path}
          title={this.props.t("title")}
          description={this.props.t("description")}
          metaType={this.props.metaType}
          metaImgPath={this.props.metaImgPath}
          metaImgAlt={this.props.metaImgAlt}
          metaTwitterCardType={this.props.metaTwitterCardType}
        />

        <div className={styles.main}>
          <h1>{"HomeFeed"}</h1>
        </div>
      </React.Fragment>
    );
  }
}
