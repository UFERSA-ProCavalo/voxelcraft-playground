import { useState } from "react";
import { usePlaygroundStore } from "~/features/playground/lib/store";
import { Scene } from "./Scene";
import { Button } from "~/components/ui/button";

interface RightPanelProps {
  code: string;
  perfOffset?: number;
  selectedChallengeId?: string | null;
}

import { DraggablePopup } from "../DraggablePopup";

import { ToolMenu } from "../ToolMenu";

// // import { VoxelPreviewScene } from "../VoxelPreviewScene";
import { useChallengeVoxels } from "../../lib/ChallengeVoxelsProvider";

export function RightPanel({
  code,
  perfOffset = 0,
  selectedChallengeId,
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
        <div
          style={{
            flex: 1,
            minHeight: 0,
            borderBottom: "1px solid #eee",
            background: "#fafbfc",
            overflow: "hidden",
          }}
        >
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
          )}{" "}
        </div>
        <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <Scene
            code={code}
            perfOffset={perfOffset}
            showAxes={showAxes}
            showOutline={showOutline}
            preview={false}
          />
        </div>{" "}
      </div>
    </div>
  );
}
