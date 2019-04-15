import * as React from "react";
import { Heading } from "evergreen-ui";
import styles from "./styles.scss";
import { Switch } from "react-router-dom";
import { LocalProps } from ".";
import EnhancedRoute from "@client/views/components/EnhancedRoute";

export type Props = LocalProps;

export type State = {};

export class Blog extends React.PureComponent<Props, State> {
  public render() {
    console.log(Object.keys(this.props));
    return (
      <div className={styles.main}>
        <Heading size={700}>{"Blog"}</Heading>
        <Switch>
          {this.props.routes.map((r, i) => (
            <EnhancedRoute key={i} {...r} />
          ))}
        </Switch>
      </div>
    );
  }
}

export default Blog;
