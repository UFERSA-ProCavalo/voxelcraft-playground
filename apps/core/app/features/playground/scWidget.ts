import type { Widget } from "./widget";

declare global {
  interface Window {
    SC: {
      Widget: SCWidgetFactory;
    };
  }
}

export interface SCWidgetFactory {
  (element: HTMLIFrameElement | string): Widget;
  Events: Record<string, string>;
}
