import * as React from "react";
import { hot } from "react-hot-loader";
import { withRouter, RouteComponentProps } from "react-router";

type Props = {};

type State = {};

export class App extends React.Component<
  Props & RouteComponentProps<{}>,
  State
> {
  public render() {
    return <div>{"App"}</div>;
  }
}

export default hot(module)(withRouter(App));
