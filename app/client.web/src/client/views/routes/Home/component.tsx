import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps, StoreProps, DispatchProps } from ".";
import HeadTags from "@client/views/components/HeadTags";
import loadable from "@loadable/component";

const Dashboard = loadable(() => import("@client/views/routes/Home/Dashboard"));
const SplashScreen = loadable(() => import("@client/views/routes/Home/SplashScreen")); // prettier-ignore

type Props = LocalProps & StoreProps & DispatchProps;

type State = {};

export class Home extends React.PureComponent<Props, State> {
  public static i18nNamespace = "route_Home";

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
          {this.props.isAuthenticated ? <Dashboard /> : <SplashScreen />}
        </div>
      </React.Fragment>
    );
  }
}
