import * as React from "react";
import styles from "./component.styles.scss";
import AuthLayout from "@client/views/core/AuthLayout";
import LoginForm from "./LoginForm";
import { LocalProps, StoreProps, DispatchProps } from ".";
import HeadTags from "@client/views/components/HeadTags";
import { RedirectProps, Redirect } from "react-router";

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class Login extends React.PureComponent<Props, State> {
  public static i18nNamespace = "route_Login";

  private referrerRoute: RedirectProps["to"] = {
    pathname: "/",
  };

  public constructor(props: Props) {
    super(props);

    if (
      props.location &&
      props.location.state &&
      props.location.state.from &&
      props.location.state.from.pathname !== "/login"
    ) {
      this.referrerRoute = props.location.state.from;
    } else if (props.location && props.location.search) {
      const from = queryParamsToObj(props.location.search)["from"];
      if (from) {
        this.referrerRoute = decodeURIComponent(from);
      }
    }
  }

  public render() {
    const {
      t,
      config: {
        app: { appName },
      },
    } = this.props;

    if (this.props.isAuthenticated) {
      return <Redirect to={this.referrerRoute} />;
    }

    return (
      <React.Fragment>
        <HeadTags
          path={this.props.path}
          title={t("title")}
          description={t("description", { appName })}
          metaType={this.props.metaType}
          metaImgPath={this.props.metaImgPath}
          metaImgAlt={this.props.metaImgAlt}
          metaTwitterCardType={this.props.metaTwitterCardType}
        />

        <AuthLayout title={t("form.heading", { appName })}>
          <div className={styles.main}>
            <LoginForm />
          </div>
        </AuthLayout>
      </React.Fragment>
    );
  }
}

function queryParamsToObj(qs: string): object {
  return decodeURIComponent(qs)
    .slice(1)
    .split("&")
    .map((str: string) => str.split("="))
    .reduce((acc, q) => ({ ...acc, [q[0]]: q[1] || "" }), {});
}
