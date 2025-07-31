import { useState } from "react";
import { TEMA_CENA } from '../utils';
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
  const [showPreview, setShowPreview] = useState(false);

  const { getVoxelsForChallenge } = useChallengeVoxels();
  const previewVoxels = selectedChallengeId
    ? getVoxelsForChallenge(selectedChallengeId)
    : undefined;
    
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
          <div
            style={{
              width: '100%',
              height: 6,
              background: 'var(--color-border, #e5e7eb)',
              margin: '8px 0',
              borderRadius: 3,
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            }}
          />
          <div style={TEMA_CENA}>
            <Scene
              code={code}
              perfOffset={perfOffset}
              showAxes={showAxes}
              showOutline={showOutline}
              preview={false}
            />
          </div>
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
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={TEMA_CENA}>
            <Scene
              code={code}
              perfOffset={perfOffset}
              showAxes={showAxes}
              showOutline={showOutline}
              preview={false}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
}
