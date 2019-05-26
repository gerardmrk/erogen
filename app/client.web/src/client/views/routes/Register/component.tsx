import * as React from "react";
import styles from "./component.styles.scss";
import AuthLayout from "@client/views/core/AuthLayout";
import { LocalProps } from ".";
import HeadTags from "@client/views/components/HeadTags";
import Input from "@client/views/components/ui.elements/Input";

type Props = LocalProps;

type State = {};

export class Register extends React.PureComponent<Props, State> {
  public static i18nNamespace = "route_Register";

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

        <AuthLayout title={this.props.t("form-heading")}>
          <div className={styles.main}>
            <Input type={"text"} />
          </div>
        </AuthLayout>
      </React.Fragment>
    );
  }
}
