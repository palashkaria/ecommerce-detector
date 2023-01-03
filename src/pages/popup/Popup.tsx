import logo from "@src/assets/img/logo.svg";
import { platformToSvg } from "@src/shared/PlatformData";
import "@src/styles/index.css";
import { createSignal } from "solid-js";

const [getPlatform, setPlatform] = createSignal("");

const setSignal = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const domain = new URL(tab.url).hostname;
  const siteDetails = await chrome.storage.local.get(domain);
  const platform = siteDetails[domain].platform;
  setPlatform(platform);
};

setSignal();

const Popup = () => {
  return (
    <div class="ecom-detect-app-wrap h-40 ">
      <header class="flex border-b-2 p-2">
        <div class="flex flex-row items-center">
          <img src={chrome.runtime.getURL(logo)} alt="logo" class="h-8 w-8" />
          <p class="ml-2 text-xl font-bold">Detector</p>
        </div>
      </header>
      <div class="grid grid-flow-col items-center p-2">
        <p class="flex text-base">Platform </p>
        <div class="flex items-center">
          <img
            class="h-7 w-6"
            src={platformToSvg[getPlatform()]}
            alt={getPlatform()}
          />{" "}
          <p class="ml-2 text-sm font-bold text-neutral-900">{getPlatform()}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
