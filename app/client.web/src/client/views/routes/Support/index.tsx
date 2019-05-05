import { Support } from "./component";
import { WithTranslation, withTranslation } from "react-i18next";

export type LocalProps = WithTranslation & {};

export default withTranslation("route_Support")(Support);
