import React from "react";
import { useSettingsStore } from "~/store/settingsStore";
import { Slider } from "~/components/ui/slider";
import { Button } from "~/components/ui/button";

export function MusicSettingsPanel() {
  const volume = useSettingsStore((s) => s.volumeMusic);
  const setVolume = useSettingsStore((s) => s.setVolumeMusic);
  const mute = useSettingsStore((s) => s.muteMusic);
  const setMute = useSettingsStore((s) => s.setMuteMusic);

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 16, padding: 12 }}
    >
      <span style={{ minWidth: 60 }}>Música</span>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={[mute ? 0 : volume]}
        onValueChange={([v]) => setVolume(v)}
        style={{ width: 120 }}
        disabled={mute}
      />
      <span style={{ width: 32, textAlign: "right" }}>
        {Math.round((mute ? 0 : volume) * 100)}%
      </span>
      <Button
        size="icon"
        variant={mute ? "default" : "outline"}
        onClick={() => setMute(!mute)}
        aria-label={mute ? "Desmutar música" : "Mutar música"}
        style={{ marginLeft: 8 }}
      >
        {mute ? "🔇" : "🔊"}
      </Button>
    </div>
  );
}
