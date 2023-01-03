import { platformToColor, platformToSvg } from "@src/shared/PlatformData";
import "@src/styles/index.css";
import toast, { Toaster } from "solid-toast";
// import logo from "@src/assets/img/logo.svg";
// import styles from "./App.module.css";

const notify = async () => {
  const domain = new URL(window.location.href).hostname;
  const siteDetails = await chrome.storage.local.get(domain);
  const platform = siteDetails[domain].platform;

  // Custom JSX Toast
  toast.custom(
    (t) => (
      <div
        class={`${
          t.visible ? "animate-enter" : "animate-leave"
        } pointer-events-auto relative w-[290px] max-w-sm overflow-hidden rounded-lg bg-white text-neutral-50 shadow-lg ring-1 ring-black ring-opacity-5`}
        style={{
          "background-color": platformToColor[platform],
        }}
      >
        <div class="p-2">
          <div class="flex items-center">
            <div class="h-8 w-7 shrink-0">
              <img
                class="h-8 w-7"
                src={platformToSvg[platform]}
                alt={platform}
              />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium">{platform}</p>
            </div>
            <div class="ml-4 flex shrink-0">
              <button
                class="inline-flex rounded-md text-gray-50 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

export default App;
