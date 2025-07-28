import { create } from "zustand";

interface PlaygroundState {
  code: string;
  selectedChallengeId: string | null;
  showAxes: boolean;
  showOutline: boolean;
  showRulers: boolean;
  // Camera state for syncing between scenes
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  setCameraPosition: (pos: [number, number, number]) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setCode: (code: string) => void;
  setSelectedChallengeId: (id: string | null) => void;
  setShowAxes: (v: boolean) => void;
  setShowOutline: (v: boolean) => void;
  setShowRulers: (v: boolean) => void;
}

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  code: "// Write code here\n",
  selectedChallengeId: null,
  showAxes: true,
  showOutline: true,
  showRulers: false,
  cameraPosition: [50, 50, 50], // default initial camera position
  cameraTarget: [0, 0, 0], // default initial camera target
  setCameraPosition: (pos) => set({ cameraPosition: pos }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setCode: (code) => set({ code }),
  setSelectedChallengeId: (id) => set({ selectedChallengeId: id }),
  setShowAxes: (v) => set({ showAxes: v }),
  setShowOutline: (v) => set({ showOutline: v }),
  setShowRulers: (v) => set({ showRulers: v }),
}));
