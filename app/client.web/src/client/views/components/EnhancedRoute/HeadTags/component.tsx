import * as React from "react";
import { Helmet } from "react-helmet";

export type Props = {
  title?: string;
  description?: string;
  metaType?: string;
};

export type State = {};

export class HeadTags extends React.PureComponent<Props, State> {
  public render() {
    return (
      <Helmet>
        <title>{""}</title>
      </Helmet>
    );
  }
}

export default HeadTags;
