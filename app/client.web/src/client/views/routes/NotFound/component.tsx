import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/ui.elements/Container";
import { LocalProps } from ".";
import HeadTags from "@client/views/components/HeadTags";

type Props = LocalProps;

type State = {};

export class NotFound extends React.PureComponent<Props, State> {
  public static i18nNamespace = "route_NotFound";

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
          <Container className={styles.container}>
            <h1>{"404"}</h1>
            <p>{"The page you requested does not exist."}</p>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
