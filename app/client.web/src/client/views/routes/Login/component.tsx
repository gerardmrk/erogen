import * as React from "react";
import styles from "./component.styles.scss";
import AuthRoutesWrapper from "@client/views/core/AuthRoutesWrapper";
import LoginForm from "./LoginForm";
import { LocalProps } from ".";
import HeadTags from "@client/views/components/HeadTags";

type Props = LocalProps;

type State = {};

export class Login extends React.PureComponent<Props, State> {
  public static i18nNamespace = "route_Login";

  public componentDidMount() {}

  public render() {
    const { t } = this.props;

    return (
      <React.Fragment>
        <HeadTags
          path={this.props.path}
          title={t("title")}
          description={t("description", { appName: "xo" })}
          metaType={this.props.metaType}
          metaImgPath={this.props.metaImgPath}
          metaImgAlt={this.props.metaImgAlt}
          metaTwitterCardType={this.props.metaTwitterCardType}
        />

        <AuthRoutesWrapper title={t("form-heading")}>
          <div className={styles.main}>
            <LoginForm />
          </div>
        </AuthRoutesWrapper>
      </React.Fragment>
    );
  }
}
