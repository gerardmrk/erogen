import { withTranslation, WithTranslation } from "react-i18next";
import { Hero } from "./component";

export type LocalProps = {} & WithTranslation;

export default withTranslation()(Hero);
