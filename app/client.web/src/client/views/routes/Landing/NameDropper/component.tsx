import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/Container";

type Props = {};

type State = {};

const TMP_TEST = ["Smashing", "Pumpkins", "2077 :(", "Arabian", "Nights"];

export class NameDropper extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Container>
          <div className={styles.brandCarousel}>
            {TMP_TEST.map((tt, i) => (
              <div className={styles.brandItem} key={i}>
                <p>{tt}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default NameDropper;
