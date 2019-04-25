import * as React from "react";
import styles from "./component.styles.scss";
import Container from "@client/views/components/ui.elements/Container";
import { LocalProps } from ".";

type Props = LocalProps;

type State = {};

export class Hero extends React.PureComponent<Props, State> {
  public render() {
    const { t } = this.props;

    return (
      <section className={styles.main}>
        <Container>
          <div className={styles.canvas}>
            <div className={styles.leftPane}>
              <h1>
                <em>{t("routes.landing.header")}</em>
              </h1>
              <div className={styles.fluff}>
                <p>{"Where is myyyy mind"}</p>
                <br />
                <p>{"Alpha bravo charlie delta echo foxtrot golf"}</p>
                <br />
                <p>{"Hotel india juliet kilo lima mike november oscar papa"}</p>
                <br />
                <p>
                  {
                    "Quebec romeo sierra tango unicorn victor whiskey x-ray yankee zulu"
                  }
                </p>
              </div>
            </div>
            <div className={styles.rightPane}>
              <div>{"Nothing to see here"}</div>
            </div>
          </div>
        </Container>
      </section>
    );
  }
}
