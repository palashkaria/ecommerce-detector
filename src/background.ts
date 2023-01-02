// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//   switch (request.type) {
//     case "injectDetectionScript":
//       console.log("injecting script!");
//       const [tab] = await chrome.tabs.query({
//         active: true,
//         currentWindow: true,
//       });
//       if (!tab.id) {
//         return;
//       }
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         files: ["js/detect.js"],
//       });
//       return true;

//     default:
//       return true;
//   }
// });

const registerScript = () => {
  chrome.scripting.registerContentScripts([
    {
      id: "detect-script",
      js: ["js/detect.js"],
      matches: ["*://*/*"],
      world: "MAIN",
    },
  ]);
};
function keepAlive() {
  setTimeout(keepAlive, 1000 * 30);
}
keepAlive();
registerScript();
