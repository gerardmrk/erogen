import * as React from "react";
import styles from "./styles.scss";
import { Heading, Text, TextInput, Paragraph } from "evergreen-ui";
import Container from "@client/views/components/Container";
import heroImage from "./hero-image.svg";

type Props = {};

type State = {};

export class Hero extends React.PureComponent<Props, State> {
  public render() {
    return (
      <div className={styles.main}>
        <Container>
          <div className={styles.canvas}>
            <div className={styles.leftPane}>
              <Heading color={"#f9f9f9"} size={900} marginBottom={"1em"}>
                <em>{"Where Is My Mind?"}</em>
              </Heading>
              <TextInput
                display={"block"}
                border={"none"}
                height={45}
                width={400}
                placeholder={"Where Is My Mind?"}
              />
              <Paragraph marginTop={"1em"}>
                {"Alpha bravo charlie delta echo foxtrot golf"}
              </Paragraph>
              <Paragraph>
                {"Hotel india juliet kilo lima mike november oscar papa."}
              </Paragraph>
            </div>
            <div className={styles.rightPane}>
              <img src={heroImage} alt={"hero image"} />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Hero;
