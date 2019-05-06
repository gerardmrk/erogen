import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/ui.elements/Container";
import { LocalProps } from ".";
import HeadTags from "@client/views/components/HeadTags";

export type Props = LocalProps;

export type State = {};

export class Documentation extends React.PureComponent<Props, State> {
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
            <h1>{"Documentation"}</h1>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
