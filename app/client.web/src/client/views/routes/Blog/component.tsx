import * as React from "react";
import styles from "./component.styles.scss";
import { Switch } from "react-router-dom";
import { LocalProps } from ".";
import EnhancedRoute from "@client/views/components/EnhancedRoute";
import Container from "@client/views/components/ui.elements/Container";

export type Props = LocalProps;

export type State = {};

export class Blog extends React.PureComponent<Props, State> {
  public static readonly chunkName = "";
  public static readonly i18nNamespace = "";

  public render() {
    return (
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
    );
  }
}
