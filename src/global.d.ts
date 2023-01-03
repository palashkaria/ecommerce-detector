import Chrome from "chrome";

declare namespace chrome {
  export default Chrome;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const content: string;
  export default content;
}

declare global {
  interface Window {
    Shopify: unknown;
    woocommerce_params: unknown;
    magentoStorefrontEvents: unknown;
  }
}
