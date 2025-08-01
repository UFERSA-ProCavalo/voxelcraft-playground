import { create } from "zustand";

interface ChatSettingsState {
  incluirCodigo: boolean;
  setIncluirCodigo: (v: boolean) => void;
  chatWidth: string;
  setChatWidth: (w: string) => void;
}

export const useChatSettingsStore = create<ChatSettingsState>((set) => ({
  incluirCodigo: false,
  setIncluirCodigo: (v) => set({ incluirCodigo: v }),
  chatWidth: "100vh",
  setChatWidth: (w) => set({ chatWidth: w }),
}));
