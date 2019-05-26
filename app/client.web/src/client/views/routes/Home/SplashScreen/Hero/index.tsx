import { Hero } from "./component";
import {
  withTranslation,
  WithTranslation,
} from "@client/views/core/I18nProvider";
import { Home } from "../../component";

export type LocalProps = WithTranslation & {};

export default withTranslation(Home.i18nNamespace)(Hero);
