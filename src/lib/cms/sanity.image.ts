import { createImageUrlBuilder } from "@sanity/image-url";
import { readCmsConfig } from "./config";
import type { CmsImage } from "./content.schema";
export function imageUrl(image: CmsImage, width = 1600) {
  const config = readCmsConfig(process.env);
  if (!image?.asset || !config) return "/images/content-placeholder.svg";
  return createImageUrlBuilder(config)
    .image(image)
    .width(width)
    .fit("max")
    .auto("format")
    .url();
}
