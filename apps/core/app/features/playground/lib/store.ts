import { create } from "zustand";

interface PlaygroundState {
  code: string;
  selectedChallengeId: string | null;
  setCode: (code: string) => void;
  setSelectedChallengeId: (id: string | null) => void;
}

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  code: "// Write code here\n",
  selectedChallengeId: null,
  setCode: (code) => set({ code }),
  setSelectedChallengeId: (id) => set({ selectedChallengeId: id }),
}));
