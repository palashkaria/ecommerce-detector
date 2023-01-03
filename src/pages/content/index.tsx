import { render } from "solid-js/web";
import { App } from "./components/App";

const init = async () => {
  // execute script
  // send message to background page
  await chrome.runtime.sendMessage({
    type: "injectDetectionScript",
  });
  chrome.runtime.onMessage.addListener((message) => {
    if (
      message.type === "platformDetected" &&
      message.siteDetails &&
      message.siteDetails.platform !== "NotFound"
    ) {
      const domain = new URL(message.siteDetails.url).hostname;
      chrome.storage.local.set({
        [domain]: message.siteDetails,
      });
      const root = document.createElement("div");
      root.id = "ecom-detect-extension-root";
      document.body.append(root);
      render(App, root);
    }
  });
};
init();
