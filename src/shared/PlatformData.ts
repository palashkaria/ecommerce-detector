import shopify from "@src/assets/logos/shopify.svg";
import wix from "@src/assets/logos/wix.svg";
import woocommerce from "@src/assets/logos/woocommerce.svg";

export enum PlatformEnum {
  shopify = "Shopify",
  wix = "Wix",
  woocomerce = "Woocomerce",
  magento3 = "Magento 3",
  prestashop = "Prestashop",
  NotFound = "NotFound",
}
export const platformToColor = {
  [PlatformEnum.shopify]: "rgb(9, 128, 97)",
  [PlatformEnum.woocomerce]: "#96588a",
  [PlatformEnum.magento3]: "#f26c4f",
  [PlatformEnum.prestashop]: "#5d9cec",
  [PlatformEnum.wix]: "#FAAD4D",
  [PlatformEnum.NotFound]: "#ddd",
};

export const platformToSvg = {
  [PlatformEnum.shopify]: chrome.runtime.getURL(shopify),
  [PlatformEnum.woocomerce]: chrome.runtime.getURL(woocommerce),
  [PlatformEnum.wix]: chrome.runtime.getURL(wix),
};

export const platformToBadgeText = {
  [PlatformEnum.shopify]: "S",
  [PlatformEnum.woocomerce]: "W",
  [PlatformEnum.magento3]: "M",
  [PlatformEnum.prestashop]: "P",
  [PlatformEnum.wix]: "Wx",
  [PlatformEnum.NotFound]: "X",
};
