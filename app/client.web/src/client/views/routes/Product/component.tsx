import * as React from "react";
import styles from "./styles.scss";
import Container from "@client/views/components/Container";

type Props = {};

type State = {};

export class Product extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Container>
          <h1>{"Product"}</h1>
        </Container>
      </div>
    );
  }
}

export default Product;
