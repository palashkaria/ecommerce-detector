import { platformToBadgeText, platformToColor } from "@src/shared/PlatformData";

// this enum needs to be duplicated because it's injected
const getDetailsFromSite = () => {
  const PLATFORM_ENUM = {
    shopify: "Shopify",
    wix: "Wix",
    woocomerce: "Woocomerce",
    magento3: "Magento 3",
    prestashop: "Prestashop",
    NotFound: "NotFound",
  };
  let platform = PLATFORM_ENUM.NotFound;
  if (window.Shopify) {
    platform = PLATFORM_ENUM.shopify;
  }
  if (window.woocommerce_params) {
    platform = PLATFORM_ENUM.woocomerce;
  }
  if (window.magentoStorefrontEvents) {
    platform = PLATFORM_ENUM.magento3;
  }
  if (window.wixDevelopersAnalytics) {
    platform = PLATFORM_ENUM.wix;
  }
  const url = window.location.href;
  return {
    platform,
    url,
  };
};
const getSiteDetails = async (tabId: number) => {
  const finalResult = await chrome.scripting.executeScript({
    target: { tabId },
    world: "MAIN",
    func: getDetailsFromSite,
  });
  return finalResult[0].result;
};

// const registerScript = () => {
//   chrome.scripting.registerContentScripts([
//     {
//       id: "detect-script",
//       js: ["js/detect.js"],
//       matches: ["*://*/*"],
//       world: "MAIN",
//     },
//   ]);
// };
chrome.runtime.onMessage.addListener(async (request, sender) => {
  switch (request.type) {
    case "injectDetectionScript":
      if (sender.tab.id) {
        const scriptResult = await getSiteDetails(sender.tab.id);
        chrome.action.setBadgeBackgroundColor(
          {
            color: platformToColor[scriptResult.platform],
            tabId: sender.tab.id,
          },
          () => {
            chrome.action.setBadgeText({
              text: platformToBadgeText[scriptResult.platform],
              tabId: sender.tab.id,
            });
          }
        );
        chrome.tabs.sendMessage(sender.tab.id, {
          type: "platformDetected",
          siteDetails: scriptResult,
        });
      }
      return true;
    default:
      return true;
  }
});

function keepAlive() {
  setTimeout(keepAlive, 1000 * 30);
}
keepAlive();
// registerScript();
