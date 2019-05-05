import { BlogPost } from "./component";
import { withTranslation, WithTranslation } from "react-i18next";

export type LocalProps = WithTranslation & {};

export default withTranslation("route_BlogPost")(BlogPost);
