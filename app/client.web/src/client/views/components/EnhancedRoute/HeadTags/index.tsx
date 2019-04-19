import { withConfig, InjectedConfig } from "@client/views/contexts/config";
import { HeadTags } from "./component";

export type LocalProps = InjectedConfig & {
  title?: string;
  description?: string;
  metaType?: string;
  metaImgPath?: string;
  metaImgAlt?: string;
  metaTwitterCardType?: "summary" | "summary_large_image" | "app" | "player";
  path?: string;
};

export default withConfig(HeadTags);
