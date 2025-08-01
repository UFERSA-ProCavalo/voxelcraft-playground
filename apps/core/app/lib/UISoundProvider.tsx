import React from "react";

export function UISoundProvider() {
  return (
    <>
      <audio id="ui-sound-click" src="/sounds/click.mp3" preload="auto" />
      <audio id="ui-sound-hover" src="/sounds/hover.mp3" preload="auto" />
      <audio id="ui-sound-close" src="/sounds/close.mp3" preload="auto" />
      <audio id="ui-sound-typing" src="/sounds/type1.mp3" preload="auto" />
    </>
  );
}
