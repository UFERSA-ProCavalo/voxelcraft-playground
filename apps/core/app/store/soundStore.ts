import { create } from "zustand";

export type UISoundName = "click" | "hover" | "close" | "typing" | "success";

interface SoundStore {
  playSound: (name: UISoundName) => void;
  effectsVolume: number;
  setEffectsVolume: (v: number) => void;
  muted: boolean;
  toggleMuted: () => void;
  typingSoundEnabled: boolean;
  toggleTypingSound: () => void;
}

export const useSoundStore = create<SoundStore>((set, get) => ({
  effectsVolume: 80,
  setEffectsVolume: (v: number) => set({ effectsVolume: v }),
  muted: false,
  toggleMuted: () => set((state) => ({ muted: !state.muted })),
  typingSoundEnabled: true,
  toggleTypingSound: () =>
    set((state) => ({ typingSoundEnabled: !state.typingSoundEnabled })),
  playSound: (name: UISoundName) => {
    const audio = document.getElementById(
      `ui-sound-${name}`,
    ) as HTMLAudioElement | null;
    if (audio) {
      audio.currentTime = 0;
      try {
        audio.volume = get().muted ? 0 : get().effectsVolume / 100;
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
  const typingSoundEnabled = useSoundStore((s) => s.typingSoundEnabled);
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
