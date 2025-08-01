import { create } from "zustand";
import { useSettingsStore } from "./settingsStore";

export type UISoundName = "click" | "hover" | "close" | "typing" | "success";

interface SoundStore {
  playSound: (name: UISoundName) => void;
}

export const useSoundStore = create<SoundStore>()(() => ({
  playSound: (name: UISoundName) => {
    const audio = document.getElementById(
      `ui-sound-${name}`,
    ) as HTMLAudioElement | null;
    if (audio) {
      audio.currentTime = 0;
      try {
        // Usar volume/mute do settingsStore
        const volumeEffects = useSettingsStore.getState().volumeEffects;
        const muteEffects = useSettingsStore.getState().muteEffects;
        audio.volume = muteEffects ? 0 : volumeEffects;
        audio.play();
      } catch (err) {
        // Ignore NotAllowedError (autoplay restriction)
      }
    }
  },
}));

// Hook para tocar o som de digitação apenas uma vez por tecla pressionada (sem repetir ao segurar)
import { useRef, useCallback } from "react";
export function useTypingSoundPerKey() {
  const playSound = useSoundStore((s) => s.playSound);
  const typingSoundEnabled = useSettingsStore((s) => s.typingSoundEnabled);
  const pressedKeys = useRef<Set<string>>(new Set());

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!pressedKeys.current.has(e.code) && typingSoundEnabled) {
        playSound("typing");
        pressedKeys.current.add(e.code);
      }
    },
    [playSound, typingSoundEnabled],
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    pressedKeys.current.delete(e.code);
  }, []);

  return { handleKeyDown, handleKeyUp };
}
