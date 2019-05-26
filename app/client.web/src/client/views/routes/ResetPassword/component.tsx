import * as React from "react";
import styles from "./component.styles.scss";
import AuthLayout from "@client/views/core/AuthLayout";
import { LocalProps } from ".";
import HeadTags from "@client/views/components/HeadTags";

type Props = LocalProps;

type State = {};

export class ResetPassword extends React.PureComponent<Props, State> {
  public static i18nNamespace = "route_ResetPassword";

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

        <AuthLayout title={"Reset Your Password"}>
          <div className={styles.main}>{"Form"}</div>
        </AuthLayout>
      </React.Fragment>
    );
  }
}
