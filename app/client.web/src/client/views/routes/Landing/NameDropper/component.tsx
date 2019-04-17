import * as React from "react";
import { Pane } from "evergreen-ui";
import { Text } from "evergreen-ui";
import styles from "./styles.scss";
import Container from "@client/views/components/Container";

type Props = {};

type State = {};

const TMP_TEST = ["Smashing", "Pumpkins", "2077 :(", "Arabian", "Nights"];

export class NameDropper extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Container>
          <Pane
            height={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {TMP_TEST.map((tt, i) => (
              <Pane
                key={i}
                height={80}
                width={127}
                border={"muted"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                background={"tint2"}
              >
                <Text>{tt}</Text>
              </Pane>
            ))}
          </Pane>
        </Container>
      </div>
    );
  }
}

export default NameDropper;
