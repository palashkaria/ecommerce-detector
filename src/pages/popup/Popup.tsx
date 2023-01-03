import logo from "@src/assets/img/logo.svg";
import { PlatformEnum, platformToSvg } from "@src/shared/PlatformData";
import "@src/styles/index.css";
import { createSignal, Show } from "solid-js";

const [getPlatform, setPlatform] = createSignal("");

const setSignal = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const domain = new URL(tab.url).hostname;
  const siteDetails = await chrome.storage.local.get(domain);
  const platform = siteDetails[domain].platform;
  setPlatform(platform);
};

setSignal();

const NotFound = () => {
  return (
    <div class="ecom-detect-app-wrap h-40 ">
      <header class="ecom-flex ecom-border-b-2 ecom-p-2">
        <div class="ecom-flex ecom-flex-row ecom-items-center">
          <img
            src={chrome.runtime.getURL(logo)}
            alt="logo"
            class="ecom-h-8 ecom-w-8"
          />
          <p class="ecom-ml-2 ecom-text-xl ecom-font-bold">Detector</p>
        </div>
      </header>
      <div class="ecom-flex">
        <p class="ecom-flex ecom-p-2 ecom-text-base">
          This site doesn't use an e-commerce platform
        </p>
      </div>
    </div>
  );
};
const Popup = () => {
  return (
    <>
      <Show when={getPlatform() === PlatformEnum.NotFound}>
        <NotFound />
      </Show>
      <Show when={getPlatform() !== PlatformEnum.NotFound}>
        <div class="ecom-detect-app-wrap ecom-h-40 ">
          <header class="ecom-flex ecom-border-b-2 ecom-p-2">
            <div class="ecom-flex ecom-flex-row ecom-items-center">
              <img
                src={chrome.runtime.getURL(logo)}
                alt="logo"
                class="ecom-h-8 ecom-w-8"
              />
              <p class="ecom-ml-2 ecom-text-xl ecom-font-bold">Detector</p>
            </div>
          </header>
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
        </div>
      </Show>
    </>
  );
};

export default Popup;
