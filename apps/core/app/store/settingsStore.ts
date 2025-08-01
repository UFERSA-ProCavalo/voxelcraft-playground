import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SettingsState {
  volumeMaster: number; // 0.0 - 1.0
  volumeMusic: number; // 0.0 - 1.0
  volumeEffects: number; // 0.0 - 1.0
  muteMaster: boolean;
  muteMusic: boolean;
  muteEffects: boolean;
  typingSoundEnabled: boolean;
  toggleTypingSound: () => void;
  setVolumeMaster: (v: number) => void;
  setVolumeMusic: (v: number) => void;
  setVolumeEffects: (v: number) => void;
  setMuteMaster: (m: boolean) => void;
  setMuteMusic: (m: boolean) => void;
  setMuteEffects: (m: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      volumeMaster: 1,
      volumeMusic: 1,
      volumeEffects: 1,
      muteMaster: false,
      muteMusic: false,
      muteEffects: false,
      typingSoundEnabled: true,
      toggleTypingSound: () =>
        set({ typingSoundEnabled: !get().typingSoundEnabled }),
      setVolumeMaster: (v) => set({ volumeMaster: v }),
      setVolumeMusic: (v) => set({ volumeMusic: v }),
      setVolumeEffects: (v) => set({ volumeEffects: v }),
      setMuteMaster: (m) => set({ muteMaster: m }),
      setMuteMusic: (m) => set({ muteMusic: m }),
      setMuteEffects: (m) => set({ muteEffects: m }),
    }),
    {
      name: "vc_settings",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        volumeMaster: state.volumeMaster,
        volumeMusic: state.volumeMusic,
        volumeEffects: state.volumeEffects,
        muteMaster: state.muteMaster,
        muteMusic: state.muteMusic,
        muteEffects: state.muteEffects,
        typingSoundEnabled: state.typingSoundEnabled,
      }),
    },
  ),
);
