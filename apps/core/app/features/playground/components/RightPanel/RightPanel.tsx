import { useState } from "react";
import { Scene } from "./Scene";
import { Button } from "../ui/button";

interface RightPanelProps {
  code: string;
  perfOffset?: number;
  selectedChallengeId?: string | null;
}

import { DraggablePopup } from "../DraggablePopup";

import { ToolMenu } from "../shared/ToolMenu";

function PreviewButton({ onClick }: { onClick: () => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 8 }}>
      <Button size="sm" onClick={onClick}>
        Preview
      </Button>
    </div>
  );
}

function SceneDisplay({
  code,
  perfOffset,
  showAxes,
  showOutline,
  children,
}: {
  code: string;
  perfOffset?: number;
  showAxes: boolean;
  showOutline: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div style={{ flex: 1, minHeight: 0, minWidth: 0, overflow: "hidden" }}>
      <Scene
        perfOffset={perfOffset}
        code={code}
        showAxes={showAxes}
        showOutline={showOutline}
      />
      {children}
    </div>
  );
}

export function RightPanel({
  code,
  perfOffset = 0,
  selectedChallengeId,
}: RightPanelProps) {
  const [showAxes, setShowAxes] = useState(true);
  const [showOutline, setShowOutline] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

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
      />
      <PreviewButton onClick={() => setShowPreview(true)} />
      <SceneDisplay
        code={code}
        perfOffset={perfOffset}
        showAxes={showAxes}
        showOutline={showOutline}
      >
        {showPreview && (
          <DraggablePopup
            code={code}
            onClose={() => setShowPreview(false)}
            showAxes={showAxes}
            showOutline={showOutline}
            perfOffset={perfOffset}
            challengeId={
              typeof selectedChallengeId === "string"
                ? selectedChallengeId
                : undefined
            }
          />
        )}
      </SceneDisplay>
    </div>
  );
}
