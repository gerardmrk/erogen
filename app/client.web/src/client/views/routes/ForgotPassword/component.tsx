import * as React from "react";
import styles from "./component.styles.scss";
import AuthLayout from "@client/views/core/AuthLayout";
import { LocalProps } from ".";
import Form from "@client/views/components/ui.collections/Form";
import HeadTags from "@client/views/components/HeadTags";

type Props = LocalProps;

type State = {};

export class ForgotPassword extends React.PureComponent<Props, State> {
  public static i18nNamespace = "route_ForgotPassword";

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

        <AuthLayout title={"Forgot Password"}>
          <div className={styles.main}>
            <Form>
              <Form.Input />
            </Form>
          </div>
        </AuthLayout>
      </React.Fragment>
    );
  }
}
