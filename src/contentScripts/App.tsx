import { createSignal } from "solid-js";
import "./style.css";
const [getPlatform, setPlatform] = createSignal("");
import toast, { Toaster } from "solid-toast";

enum PlatformEnum {
  shopify = "Shopify",
  wix = "Wix",
  woocomerce = "Woocomerce",
  magento3 = "Magento 3",
  prestashop = "Prestashop",
  NotFound = "NotFound",
}
const platformToColor = {
  [PlatformEnum.shopify]: "rgb(9, 128, 97)",
  [PlatformEnum.woocomerce]: "#96588a",
  [PlatformEnum.magento3]: "#f26c4f",
  [PlatformEnum.prestashop]: "#5d9cec",
  [PlatformEnum.wix]: "#ff8c00",
};

const platformToSvg = {
  [PlatformEnum.shopify]: `<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 108.44 122.88" style="enable-background:new 0 0 108.44 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#95BF47;} .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#5E8E3E;} .st2{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}</style><g><path class="st0" d="M94.98,23.66c-0.09-0.62-0.63-0.96-1.08-1c-0.45-0.04-9.19-0.17-9.19-0.17s-7.32-7.1-8.04-7.83 c-0.72-0.72-2.13-0.5-2.68-0.34c-0.01,0-1.37,0.43-3.68,1.14c-0.38-1.25-0.95-2.78-1.76-4.32c-2.6-4.97-6.42-7.6-11.03-7.61 c-0.01,0-0.01,0-0.02,0c-0.32,0-0.64,0.03-0.96,0.06c-0.14-0.16-0.27-0.32-0.42-0.48c-2.01-2.15-4.58-3.19-7.67-3.1 c-5.95,0.17-11.88,4.47-16.69,12.11c-3.38,5.37-5.96,12.12-6.69,17.35c-6.83,2.12-11.61,3.6-11.72,3.63 c-3.45,1.08-3.56,1.19-4.01,4.44C9.03,39.99,0,109.8,0,109.8l75.65,13.08l32.79-8.15C108.44,114.73,95.06,24.28,94.98,23.66 L94.98,23.66z M66.52,16.63c-1.74,0.54-3.72,1.15-5.87,1.82c-0.04-3.01-0.4-7.21-1.81-10.83C63.36,8.47,65.58,13.58,66.52,16.63 L66.52,16.63z M56.69,19.68c-3.96,1.23-8.29,2.57-12.63,3.91c1.22-4.67,3.54-9.33,6.38-12.38c1.06-1.14,2.54-2.4,4.29-3.12 C56.38,11.52,56.73,16.39,56.69,19.68L56.69,19.68z M48.58,3.97c1.4-0.03,2.57,0.28,3.58,0.94C50.55,5.74,49,6.94,47.54,8.5 c-3.78,4.06-6.68,10.35-7.83,16.43c-3.6,1.11-7.13,2.21-10.37,3.21C31.38,18.58,39.4,4.23,48.58,3.97L48.58,3.97z"/><path class="st1" d="M93.9,22.66c-0.45-0.04-9.19-0.17-9.19-0.17s-7.32-7.1-8.04-7.83c-0.27-0.27-0.63-0.41-1.02-0.47l0,108.68 l32.78-8.15c0,0-13.38-90.44-13.46-91.06C94.9,23.04,94.35,22.7,93.9,22.66L93.9,22.66z"/><path class="st2" d="M57.48,39.52l-3.81,14.25c0,0-4.25-1.93-9.28-1.62c-7.38,0.47-7.46,5.12-7.39,6.29 c0.4,6.37,17.16,7.76,18.11,22.69c0.74,11.74-6.23,19.77-16.27,20.41c-12.05,0.76-18.69-6.35-18.69-6.35l2.55-10.86 c0,0,6.68,5.04,12.02,4.7c3.49-0.22,4.74-3.06,4.61-5.07c-0.52-8.31-14.18-7.82-15.04-21.48c-0.73-11.49,6.82-23.14,23.48-24.19 C54.2,37.88,57.48,39.52,57.48,39.52L57.48,39.52z"/></g></svg>`,
};

const notify = () => {
  const platform = getPlatform() as keyof typeof platformToSvg;

  // Custom JSX Toast
  toast.custom(
    (t) => (
      <div
        class={`${
          t.visible ? "animate-enter" : "animate-leave"
        } relative max-w-sm w-[290px] bg-white text-neutral-50 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}
        style={{
          "background-color": platformToColor[platform],
        }}
      >
        <div class="p-2">
          <div class="flex items-center">
            <div
              class="flex-shrink-0 h-8 w-7"
              innerHTML={platformToSvg[platform]}
            ></div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium">{platform}</p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                class="rounded-md inline-flex text-gray-50 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => toast.dismiss(t.id)}
              >
                <span class="sr-only">Close</span>
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      duration: 1000000,
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
    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  );
};
export { setPlatform };
export default App;
