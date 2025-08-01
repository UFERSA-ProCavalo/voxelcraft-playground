import React, { useState, useEffect } from "react";
import { TEMA_CENA } from "../utils";
import { Separator } from "~/components/ui/separator";
import { usePlaygroundStore } from "~/store/store";
import { Scene } from "./Scene";

interface RightPanelProps {
  code: string;
  perfOffset?: number;
  selectedChallengeId?: string | null;
  tab: "challenge" | "free";
  setCode?: (code: string) => void;
  onSimilarityChange?: (percent: number) => void;
}

import { ToolMenu } from "../ToolMenu";
import { ProgressBar } from "./Progress";

// // import { VoxelPreviewScene } from "../VoxelPreviewScene";
import { useChallengeVoxels } from "../../lib/ChallengeVoxelsProvider";

import type { VoxelData } from "../../types";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "~/components/ui/resizable";
import { ColorTool } from "../ColorTool";

export function RightPanel({
  code,
  perfOffset = 0,
  selectedChallengeId,
  tab,
  setCode,
  onSimilarityChange,
}: RightPanelProps) {
  // Estado para progresso de similaridade
  const [similarity, setSimilarity] = useState(0);
  const showAxes = usePlaygroundStore((s: any) => s.showAxes);
  const setShowAxes = usePlaygroundStore((s: any) => s.setShowAxes);
  const showOutline = usePlaygroundStore((s: any) => s.showOutline);
  const setShowOutline = usePlaygroundStore((s: any) => s.setShowOutline);
  // Estado para armazenar os voxels atuais do usuário
  const [userVoxels, setUserVoxels] = useState<VoxelData[]>([]);

  // Load user voxels from localStorage when challenge changes
  useEffect(() => {
    if (selectedChallengeId) {
      import("../../lib/persistence").then(({ loadChallengeProgress }) => {
        const progress = loadChallengeProgress(selectedChallengeId);
        if (progress && Array.isArray(progress.userVoxels)) {
          setUserVoxels(progress.userVoxels);
        } else {
          setUserVoxels([]);
        }
      });
    } else {
      setUserVoxels([]);
    }
  }, [selectedChallengeId]);

  // Auto-save sempre que voxels do usuário mudam (compilação)
  function handleUserVoxelsChange(voxels: VoxelData[]) {
    setUserVoxels(voxels);
    if (selectedChallengeId && voxels.length > 0 && previewVoxels) {
      const toKey = (v: {
        position: [number, number, number];
        color?: string;
      }) => `${v.position.join(",")}:${v.color || ""}`;
      const previewSet = new Set(previewVoxels.map(toKey));
      const userSet = new Set(voxels.map(toKey));
      let match = 0;
      previewSet.forEach((k) => {
        if (userSet.has(k)) match++;
      });
      const percent =
        previewSet.size === 0 ? 0 : Math.round((match / previewSet.size) * 100);
      import("../../lib/persistence").then(({ saveChallengeProgress }) => {
        saveChallengeProgress(selectedChallengeId, code, voxels, percent);
      });
    }
  }

  const { getVoxelsForChallenge } = useChallengeVoxels();
  const previewVoxels = selectedChallengeId
    ? getVoxelsForChallenge(selectedChallengeId)
    : undefined;

  // Função para comparar voxels do usuário e do preview
  function handleRun() {
    if (!selectedChallengeId || !previewVoxels) return;
    try {
      const toKey = (v: {
        position: [number, number, number];
        color?: string;
      }) => `${v.position.join(",")}:${v.color || ""}`;
      const previewSet = new Set(previewVoxels.map(toKey));
      const userSet = new Set(userVoxels.map(toKey));
      let match = 0;
      previewSet.forEach((k) => {
        if (userSet.has(k)) match++;
      });
      const percent =
        previewSet.size === 0 ? 0 : Math.round((match / previewSet.size) * 100);
      console.log(`Similaridade: ${percent}% (${match} de ${previewSet.size})`);
      // Salvar progresso automaticamente se houver voxels do usuário
      if (userVoxels.length > 0) {
        import("../../lib/persistence").then(({ saveChallengeProgress }) => {
          saveChallengeProgress(selectedChallengeId, code, userVoxels, percent);
        });
      }
    } catch (e) {
      console.error("Erro ao comparar voxels:", e);
    }
  }

  // Real-time similarity calculation
  useEffect(() => {
    if (!selectedChallengeId || !previewVoxels || !Array.isArray(userVoxels)) {
      setSimilarity(0);
      if (typeof onSimilarityChange === "function") onSimilarityChange(0);
      return;
    }
    try {
      const toKey = (v: {
        position: [number, number, number];
        color?: string;
      }) => `${v.position.join(",")}:${v.color || ""}`;
      const previewSet = new Set(previewVoxels.map(toKey));
      const userSet = new Set(userVoxels.map(toKey));
      let match = 0;
      previewSet.forEach((k) => {
        if (userSet.has(k)) match++;
      });
      const percent =
        previewSet.size === 0 ? 0 : Math.round((match / previewSet.size) * 100);
      setSimilarity(percent);
      if (typeof onSimilarityChange === "function") onSimilarityChange(percent);
    } catch (e) {
      setSimilarity(0);
      if (typeof onSimilarityChange === "function") onSimilarityChange(0);
    }
  }, [selectedChallengeId, previewVoxels, userVoxels, onSimilarityChange]);

  if (tab === "challenge") {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <ToolMenu
          showAxes={showAxes}
          setShowAxes={setShowAxes}
          showOutline={showOutline}
          setShowOutline={setShowOutline}
          showRulers={usePlaygroundStore((s: any) => s.showRulers)}
          setShowRulers={usePlaygroundStore((s: any) => s.setShowRulers)}
          code={code}
          setCode={setCode}
          voxels={userVoxels}
        />{" "}
        <ColorTool />
        {selectedChallengeId && (
          <ProgressBar value={similarity} challengeId={selectedChallengeId} />
        )}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <ResizablePanelGroup direction="vertical" className="flex-1 min-h-0">
            <ResizablePanel defaultSize={50} minSize={10}>
              <div style={{ ...TEMA_CENA, height: "100%", width: "100%" }}>
                {previewVoxels && previewVoxels.length > 0 ? (
                  <Scene
                    voxels={previewVoxels}
                    showAxes={showAxes}
                    showOutline={showOutline}
                    preview
                  />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#888",
                    }}
                  >
                    Nenhum voxel para este desafio.
                  </div>
                )}
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} minSize={10}>
              <div style={{ ...TEMA_CENA, height: "100%", width: "100%" }}>
                <Scene
                  code={code}
                  perfOffset={perfOffset}
                  showAxes={showAxes}
                  showOutline={showOutline}
                  preview={false}
                  onVoxelsChange={handleUserVoxelsChange}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    );
  }
  // Modo livre
  if (tab === "free") {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <ToolMenu
          showAxes={showAxes}
          setShowAxes={setShowAxes}
          showOutline={showOutline}
          setShowOutline={setShowOutline}
          showRulers={usePlaygroundStore((s: any) => s.showRulers)}
          setShowRulers={usePlaygroundStore((s: any) => s.setShowRulers)}
          code={code}
          setCode={setCode}
        />{" "}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div style={{ ...TEMA_CENA, height: "100%", width: "100%" }}>
            <Scene
              code={code}
              perfOffset={perfOffset}
              showAxes={showAxes}
              showOutline={showOutline}
              preview={false}
              onVoxelsChange={handleUserVoxelsChange}
            />{" "}
          </div>
        </div>
      </div>
    );
  }
  return null;
}
