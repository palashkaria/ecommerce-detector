//     default:
//       return true;
//   }
// });
const getDetailsFromSite = () => {
  const PlatformEnum = {
    shopify: "Shopify",
    wix: "Wix",
    woocomerce: "Woocomerce",
    magento3: "Magento 3",
    prestashop: "Prestashop",
    NotFound: "NotFound",
  };
  let platform = PlatformEnum.NotFound;
  if (window.Shopify) {
    console.log("found shopify!");
    platform = PlatformEnum.shopify;
  }
  if (window.woocommerce_params) {
    platform = PlatformEnum.woocomerce;
  }
  if (window.magentoStorefrontEvents) {
    platform = PlatformEnum.magento3;
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
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  switch (request.type) {
    case "injectDetectionScript":
      const scriptResult = await getSiteDetails();
      sender.tab?.id &&
        chrome.tabs.sendMessage(sender.tab?.id, {
          type: "platformDetected",
          siteDetails: scriptResult,
        });
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
