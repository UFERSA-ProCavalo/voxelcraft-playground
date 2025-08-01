import { create } from "zustand";

interface PlaygroundState {
  code: string;
  selectedChallengeId: string | null;
  showAxes: boolean;
  showOutline: boolean;
  showRulers: boolean;
  // Estado da câmera para sincronização entre cenas
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  // Cor atual do usuário para novos voxels
  userColor: string;
  setUserColor: (color: string) => void;
  // Paleta de cores editável
  colorMap: Record<number, string>;
  setColorInMap: (idx: number, color: string) => void;
  setColorMap: (map: Record<number, string>) => void;
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
  showRulers: true,
  cameraPosition: [50, 50, 50],
  cameraTarget: [0, 0, 0], // default initial camera target
  userColor: "#e74c3c", // default to first color in COLOR_MAP
  setUserColor: (color) => set({ userColor: color }),
  colorMap: {
    1: "#e74c3c", // vermelho
    2: "#27ae60", // verde
    3: "#2980b9", // azul
    4: "#f1c40f", // amarelo
    5: "#8e44ad", // roxo
    6: "#e67e22", // laranja
    7: "#1abc9c", // ciano
    8: "#34495e", // cinza escuro
    9: "#ecf0f1", // branco
  },
  setColorInMap: (idx, color) => set((state) => ({ colorMap: { ...state.colorMap, [idx]: color } })),
  setColorMap: (map) => set({ colorMap: map }),
  setCameraPosition: (pos) => set({ cameraPosition: pos }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setCode: (code) => set({ code }),
  setSelectedChallengeId: (id) => set({ selectedChallengeId: id }),
  setShowAxes: (v) => set({ showAxes: v }),
  setShowOutline: (v) => set({ showOutline: v }),
  setShowRulers: (v) => set({ showRulers: v }),
}));
