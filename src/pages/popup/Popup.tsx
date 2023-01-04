import logo from "@src/assets/img/logo.svg";
import { PlatformEnum, platformToSvg } from "@src/shared/PlatformData";
import "@src/styles/index.css";
import { createSignal, Show } from "solid-js";

const [getPlatform, setPlatform] = createSignal("");
const [getView, setView] = createSignal("main");
const [getDetectionState, setDetectionState] = createSignal("main");

const setSignal = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.url) {
    setPlatform(PlatformEnum.NotFound);
    return;
  }
  const domain = new URL(tab.url).hostname;
  const siteDetails = await chrome.storage.local.get(domain);
  const platform = siteDetails[domain].platform;
  const { detectionState } = await chrome.storage.local.get("detectionState");
  setDetectionState(detectionState);
  setPlatform(platform);
};

setSignal();

const NotFound = () => {
  return (
    <div class="ecom-flex">
      <p class="ecom-flex ecom-p-2 ecom-text-base">
        This site doesn't use an e-commerce platform
      </p>
    </div>
  );
};
const Popup = () => {
  return (
    <div class="ecom-detect-app-wrap ecom-h-40 ">
      <Header />
      <Show when={getView() === "settings"}>
        <Settings />
      </Show>
      <Show when={getView() === "main"}>
        <Show when={getPlatform() === PlatformEnum.NotFound}>
          <NotFound />
        </Show>
        <Show when={getPlatform() !== PlatformEnum.NotFound}>
          <div class="ecom-grid ecom-grid-flow-col ecom-items-center ecom-p-2">
            <p class="ecom-flex ecom-text-base">Platform</p>
            <div class="ecom-flex ecom-items-center">
              <img
                class="ecom-h-7 ecom-w-6"
                src={platformToSvg[getPlatform()]}
                alt={getPlatform()}
              />{" "}
              <p class="ecom-ml-2 ecom-text-sm ecom-font-bold ecom-text-neutral-900">
                {getPlatform()}
              </p>
            </div>
          </div>
        </Show>
      </Show>
    </div>
  );
};

export default Popup;
const Header = () => {
  return (
    <header class="ecom-grid ecom-grid-flow-col ecom-items-center ecom-border-b-2 ecom-p-2">
      <div class="ecom-flex ecom-flex-row ecom-items-center">
        <img
          src={chrome.runtime.getURL(logo)}
          alt="logo"
          class="ecom-h-8 ecom-w-8"
        />
        <p class="ecom-ml-2 ecom-text-xl ecom-font-bold">Detector</p>
      </div>
      <Show when={getView() === "settings"}>
        <div
          onClick={() => {
            setView("main");
          }}
          class="ecom-ml-2 ecom-text-right ecom-text-sm ecom-font-bold ecom-text-neutral-900"
        >
          <button class="ecom-text-xl">&times;</button>
        </div>
      </Show>
      <Show when={getView() === "main"}>
        <div
          onClick={() => {
            setView("settings");
          }}
          class="ecom-ml-2 ecom-text-right ecom-text-sm ecom-font-bold ecom-text-neutral-900"
        >
          <button>Settings</button>
        </div>
      </Show>
    </header>
  );
};

const Settings = () => {
  return (
    <div class="ecom-grid ecom-grid-flow-col ecom-p-2">
      <p class="ecom-flex ecom-text-base">Settings</p>
      <label class="ecom-flex ecom-items-center">
        <input
          type="checkbox"
          checked={getDetectionState() === "off" ? true : false}
          onInput={(e) => {
            if (getDetectionState() === "on") {
              chrome.storage.local.set({
                detectionState: "off",
              });
            } else {
              chrome.storage.local.set({
                detectionState: "on",
              });
            }
          }}
        />
        <span class="ecom-ml-1 ecom-text-sm"> Turn off for all pages</span>
      </label>
    </div>
  );
};
