import * as React from "react";

type Props = {};

type State = {};

export class MockComponent extends React.PureComponent<Props, State> {
  public render() {
    return <div>{"MockComponent"}</div>;
  }
}

export default MockComponent;
