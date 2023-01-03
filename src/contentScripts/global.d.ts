declare global {
  interface Window {
    Shopify?: any;
    woocommerce_params?: any;
    magentoStorefrontEvents?: any;
    detectedPlatform?: any;
  }
}

export {};
