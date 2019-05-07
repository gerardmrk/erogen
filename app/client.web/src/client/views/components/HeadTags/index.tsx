import { withConfig, WithConfig } from "@client/views/core/ConfigProvider";
import { HeadTags } from "./component";

export type LocalProps = WithConfig & {
  title?: string;
  description?: string;
  keywords?: string;
  metaType?: string;
  metaImgPath?: string;
  metaImgAlt?: string;
  metaTwitterCardType?: "summary" | "summary_large_image" | "app" | "player";
  path?: string;
};

export default withConfig(HeadTags);
