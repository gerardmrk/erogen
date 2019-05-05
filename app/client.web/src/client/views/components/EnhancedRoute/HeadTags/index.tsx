import { withConfig, InjectedConfig } from "@client/views/contexts/config";
import { HeadTags } from "./component";
import { withTranslation, WithTranslation } from "react-i18next";

export type LocalProps = InjectedConfig &
  WithTranslation & {
    title?: string;
    description?: string;
    keywords?: string;
    metaType?: string;
    metaImgPath?: string;
    metaImgAlt?: string;
    metaTwitterCardType?: "summary" | "summary_large_image" | "app" | "player";
    path?: string;
  };

export default withConfig(withTranslation()(HeadTags));
