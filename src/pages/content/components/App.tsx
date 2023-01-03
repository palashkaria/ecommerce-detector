import {
  PlatformEnum,
  platformToColor,
  platformToSvg,
} from "@src/shared/PlatformData";
import "@src/styles/index.css";
import toast, { Toaster } from "solid-toast";
// import logo from "@src/assets/img/logo.svg";
// import styles from "./App.module.css";

const notify = async () => {
  const domain = new URL(window.location.href).hostname;
  const siteDetails = await chrome.storage.local.get(domain);
  const platform = siteDetails[domain].platform;
  if (platform && platform === PlatformEnum.NotFound) {
    return;
  }
  // Custom JSX Toast
  toast.custom(
    (t) => {
      return (
        <div
          // eslint-disable-next-line tailwindcss/no-custom-classname
          class={`${
            t.visible ? "ecom-animate-enter" : "ecom-animate-leave"
          } ecom-pointer-events-auto ecom-relative ecom-w-[290px] ecom-max-w-sm ecom-overflow-hidden ecom-rounded-lg ecom-bg-white ecom-text-neutral-50 ecom-shadow-lg ecom-ring-1 ecom-ring-black/5`}
          style={{
            "background-color": platformToColor[platform],
          }}
        >
          <div class="ecom-p-2">
            <div class="ecom-flex ecom-items-center">
              <div class="ecom-h-8 ecom-w-7 ecom-shrink-0">
                <img
                  class="ecom-h-8 ecom-w-7"
                  src={platformToSvg[platform]}
                  alt={platform}
                />
              </div>
              <div class="ecom-ml-3 ecom-w-0 ecom-flex-1 ecom-pt-0.5">
                <p class="ecom-text-sm ecom-font-medium">{platform}</p>
              </div>
              <div class="ecom-ml-4 ecom-flex ecom-shrink-0">
                <button
                  class="ecom-inline-flex ecom-rounded-md ecom-text-gray-50 hover:ecom-text-gray-200 focus:ecom-outline-none focus:ecom-ring-2 focus:ecom-ring-blue-500 focus:ecom-ring-offset-2"
                  onClick={() => toast.dismiss(t.id)}
                >
                  <span class="ecom-sr-only">Close</span>
                  <CloseIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    },
    {
      duration: 500000,
      unmountDelay: 200,
    }
  );
};
export const App = () => {
  notify();
  return (
    <div class="ecom-detect-app-wrap">
      {/* <div class="p-4 fixed right-5 top-20 z-[2000] rounded-xl text-neutral-200 bg-green-800">
        <p class="flex flex-wrap font-bold">{getPlatform()}</p>
      </div> */}
      <Toaster />
    </div>
  );
};

const CloseIcon = () => {
  return (
    <svg class="ecom-h-5 ecom-w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  );
};

export default App;
