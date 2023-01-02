export enum PlatformEnum {
  shopify = "Shopify",
  wix = "Wix",
  woocomerce = "Woocomerce",
  magento3 = "Magento 3",
  prestashop = "Prestashop",
  NotFound = "NotFound",
}

const detectPlatform = (): PlatformEnum => {
  if (window.Shopify) {
    console.log("found shopify!");
    return PlatformEnum.shopify;
  }
  if (window.woocommerce_params) {
    return PlatformEnum.woocomerce;
  }
  if (window.magentoStorefrontEvents) {
    return PlatformEnum.magento3;
  }
  return PlatformEnum.NotFound;
};

const platformToColor = {
  [PlatformEnum.shopify]: "rgb(9, 128, 97)",
  [PlatformEnum.woocomerce]: "#96588a",
  [PlatformEnum.magento3]: "#f26c4f",
  [PlatformEnum.prestashop]: "#5d9cec",
  [PlatformEnum.wix]: "#ff8c00",
};
const injectAlert = (platform: PlatformEnum): boolean => {
  if (platform === PlatformEnum.NotFound) {
    return false;
  }
  const platformDisplay = document.createElement("div");
  platformDisplay.innerText = platform;
  platformDisplay.style.position = "fixed";
  platformDisplay.style.top = "10px";
  platformDisplay.style.right = "10px";
  platformDisplay.style.padding = "10px";
  platformDisplay.style.zIndex = "99999";
  platformDisplay.style.color = "white";
  platformDisplay.style.borderRadius = "5px";
  platformDisplay.style.backgroundColor = platformToColor[platform] || "black";
  platformDisplay.innerHTML = `<div id="detectedPlatformDisplay">${platform}</div>`;
  document.body.appendChild(platformDisplay);
  return true;
};

const detect = () => {
  const platform = detectPlatform();
  injectAlert(platform);
};

detect();
