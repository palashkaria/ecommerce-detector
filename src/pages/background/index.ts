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
  const url = window.location.href;
  return {
    platform,
    url,
  };
};
const getSiteDetails = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const tab = tabs[0];
  if (!tab.id) {
    return;
  }
  const finalResult = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
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
      const scriptResult = await getSiteDetails();
      if (sender.tab.id) {
        chrome.tabs.sendMessage(sender.tab?.id, {
          type: "platformDetected",
          siteDetails: scriptResult,
        });
        chrome.action.setBadgeBackgroundColor(
          {
            color: platformToColor[scriptResult.platform],
            tabId: sender.tab?.id,
          },
          () => {
            chrome.action.setBadgeText({
              text: platformToBadgeText[scriptResult.platform],
              tabId: sender.tab?.id,
            });
          }
        );
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
