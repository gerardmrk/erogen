import * as React from "react";
import styles from "./component.styles.scss";
import { Switch } from "react-router-dom";
import { LocalProps } from ".";
import EnhancedRoute from "@client/views/components/EnhancedRoute";
import Container from "@client/views/components/ui.elements/Container";
import HeadTags from "@client/views/components/HeadTags";

export type Props = LocalProps;

export type State = {};

export class Blog extends React.PureComponent<Props, State> {
  public static i18nNamespace = "route_Blog";

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
            <h1>{"Blog"}</h1>

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
