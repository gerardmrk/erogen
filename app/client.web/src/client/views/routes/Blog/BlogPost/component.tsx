import * as React from "react";
import styles from "./component.styles.scss";

type Props = {};

type State = {};

export class BlogPost extends React.PureComponent<Props, State> {
  public static readonly chunkName = "Blog-BlogPost";
  public static readonly i18nNamespace = "";

  public render() {
    return (
      <div className={styles.main}>
        <h1>{"BlogPost"}</h1>
      </div>
    );
  }
}

export default BlogPost;
