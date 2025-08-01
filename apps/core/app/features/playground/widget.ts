type WidgetEvent =
  | "loadProgress"
  | "playProgress"
  | "play"
  | "pause"
  | "finish"
  | "seek"
  | "ready"
  | "sharePanelOpened"
  | "downloadClicked"
  | "buyClicked"
  | "error";

type GetterCommand =
  | "getVolume"
  | "getDuration"
  | "getPosition"
  | "getSounds"
  | "getCurrentSound"
  | "getCurrentSoundIndex"
  | "isPaused";

type SetterCommand =
  | "play"
  | "pause"
  | "toggle"
  | "seekTo"
  | "setVolume"
  | "next"
  | "prev"
  | "skip";

type EventCallback = (...args: any[]) => void;

interface WidgetLoadOptions {
  callback?: () => void;
  params?: { [key: string]: string | number | boolean | undefined };
}

export interface Widget {
  /** Bind an event to the widget (e.g. "play", "pause", "finish") */
  bind(event: WidgetEvent, callback: EventCallback): this;

  /** Remove a previously bound event listener */
  unbind(event: WidgetEvent): void;

  /** Load a new track URL into the widget */
  load(url: string, options?: WidgetLoadOptions): void;

  /** Dynamic command invocation (play, pause, etc.) */
  [command: string]: any;
}