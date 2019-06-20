import * as React from "react";
import styles from "./component.styles.scss";
import HeadTags from "@client/views/components/HeadTags";
import Container from "@client/views/components/ui-elements/Container";
import { LocalProps } from ".";

export type Props = LocalProps;

export type State = {};

export class Auth extends React.PureComponent<Props, State> {
  public static i18nNamespace = "route_Auth";

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
            <h1>{"Auth"}</h1>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
