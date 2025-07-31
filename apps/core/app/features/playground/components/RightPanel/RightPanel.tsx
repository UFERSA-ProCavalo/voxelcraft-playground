import { useState } from "react";
import { TEMA_CENA } from "../utils";
import { Separator } from "~/components/ui/separator";
import { usePlaygroundStore } from "~/features/playground/lib/store";
import { Scene } from "./Scene";
import { Button } from "~/components/ui/button";
interface RightPanelProps {
  code: string;
  perfOffset?: number;
  selectedChallengeId?: string | null;
  tab: "challenge" | "free";
}

import { DraggablePopup } from "../DraggablePopup";

import { ToolMenu } from "../ToolMenu";

// // import { VoxelPreviewScene } from "../VoxelPreviewScene";
import { useChallengeVoxels } from "../../lib/ChallengeVoxelsProvider";

import type { VoxelData } from "../../types";

export function RightPanel({
  code,
  perfOffset = 0,
  selectedChallengeId,
  tab,
}: RightPanelProps) {
  const showAxes = usePlaygroundStore((s: any) => s.showAxes);
  const setShowAxes = usePlaygroundStore((s: any) => s.setShowAxes);
  const showOutline = usePlaygroundStore((s: any) => s.showOutline);
  const setShowOutline = usePlaygroundStore((s: any) => s.setShowOutline);
  // Estado para armazenar os voxels atuais do usuário
  const [userVoxels, setUserVoxels] = useState<VoxelData[]>([]);

  const { getVoxelsForChallenge } = useChallengeVoxels();
  const previewVoxels = selectedChallengeId
    ? getVoxelsForChallenge(selectedChallengeId)
    : undefined;

  // Função para comparar voxels do usuário e do preview
  function handleRun() {
    if (!selectedChallengeId || !previewVoxels) return;
    try {
      // Usa os voxels atuais da cena do usuário
      // Cria um set de chaves "x,y,z:color" para comparação
      const toKey = (v: {
        position: [number, number, number];
        color?: string;
      }) => `${v.position.join(",")}:${v.color || ""}`;
      const previewSet = new Set(previewVoxels.map(toKey));
      const userSet = new Set(userVoxels.map(toKey));
      // Conta quantos voxels do preview existem no userVoxels
      let match = 0;
      previewSet.forEach((k) => {
        if (userSet.has(k)) match++;
      });
      const percent =
        previewSet.size === 0 ? 0 : Math.round((match / previewSet.size) * 100);
      console.log(`Similaridade: ${percent}% (${match} de ${previewSet.size})`);
    } catch (e) {
      console.error("Erro ao comparar voxels:", e);
    }
  }

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
          onRun={selectedChallengeId ? handleRun : undefined}
          runDisabled={!selectedChallengeId}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div style={TEMA_CENA}>
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
          {/* Divisória entre as cenas */}
          <Separator className="my-4" />{" "}
          <div style={TEMA_CENA}>
<Scene
               code={code}
               perfOffset={perfOffset}
               showAxes={showAxes}
               showOutline={showOutline}
               preview={false}
               onVoxelsChange={setUserVoxels}
             />          </div>
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
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <div style={TEMA_CENA}>
<Scene
               code={code}
               perfOffset={perfOffset}
               showAxes={showAxes}
               showOutline={showOutline}
               preview={false}
               onVoxelsChange={setUserVoxels}
             />          </div>
        </div>
      </div>
    );
  }
  return null;
}
