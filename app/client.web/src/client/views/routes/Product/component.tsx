import * as React from "react";
import { Heading } from "evergreen-ui/esm/typography";
import styles from "./styles.scss";
import Container from "@client/views/components/Container";

type Props = {};

type State = {};

export class Product extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Container>
          <Heading size={700}>{"Product"}</Heading>
        </Container>
      </div>
    );
  }
}

export default Product;
