import { render } from "solid-js/web";
import "./index.css";
import Popup from "./Popup";

const appContainer = document.querySelector("#ecom-detect-extension-root");
if (!appContainer) {
  throw new Error("Can not find AppContainer");
}

render(Popup, appContainer);
