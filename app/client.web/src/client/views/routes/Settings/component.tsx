import * as React from "react";
import styles from "./component.styles.scss";
import { LocalProps } from ".";
import HeadTags from "@client/views/components/HeadTags";
import Container from "@client/views/components/ui-elements/Container";
import { Switch } from "react-router";
import EnhancedRoute from "@client/views/components/EnhancedRoute";

type Props = LocalProps;

type State = {};

export class Settings extends React.PureComponent<Props, State> {
  public static i18nNamespace = "route_Settings";

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
          <Container>
            <h1>{this.props.t("heading")}</h1>

            <Switch>
              {this.props.routes.map((r, i) => (
                <EnhancedRoute key={i} {...r} />
              ))}
            </Switch>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
