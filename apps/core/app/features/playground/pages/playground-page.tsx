import React, { useState, useRef, useCallback, useEffect } from "react";
import { useOutletContext } from "react-router";
import { LeftPanel } from "../components/LeftPanel/LeftPanel";
import { Scene } from "../components/RightPanel/Scene";
import { useDebounce } from "@libs/utils";

import { ChallengeVoxelsProvider } from "../lib/ChallengeVoxelsProvider";
import { loadChallengeProgress } from "../lib/persistence";
import { RightPanel } from "../components/RightPanel/RightPanel";
import { FullPageLoader } from "~/components/ui/FullPageLoader";
import { TEMA_CENA, CONTAINER_LADO_DIREITO } from "../components/utils";
export default function PlaygroundPage() {
  const [tab, setTab] = useState<"challenge" | "free">("challenge");
  
  const [code, setCode] = useState("// Write code here\n");
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(
    null,
  );

  // Restore code from localStorage if available
  useEffect(() => {
    if (selectedChallengeId) {
      const progress = loadChallengeProgress(selectedChallengeId);
      if (progress && progress.userCode) {
        setCode(progress.userCode);
        // TODO: set user voxels and feedback if you have state for them
        console.log(
          "Restored code from localStorage for challenge",
          selectedChallengeId,
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChallengeId]);

  const debouncedCode = useDebounce(code, 200);

  const { headerHeight = 0 } = useOutletContext() as { headerHeight: number };

  const [isResizing, setIsResizing] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(33); // Initial width in percentage
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isResizing && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newLeftPanelWidth = (e.clientX / containerWidth) * 100;
        const minWidth = 20; // 20%
        const maxWidth = 80; // 80%
        if (newLeftPanelWidth > minWidth && newLeftPanelWidth < maxWidth) {
          setLeftPanelWidth(newLeftPanelWidth);
        }
      }
    },
    [isResizing],
  );

  useEffect(() => {
    //desativado
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      {/* Tabs menu */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #eee",
          background: "#fafafa",
        }}
      >
        <button
          onClick={() => {
            if (tab !== "challenge") {
              setTab("challenge");
            }
          }}
          style={{
            padding: "12px 24px",
            border: "none",
            background: tab === "challenge" ? "#fff" : "transparent",
            borderBottom:
              tab === "challenge"
                ? "2px solid #0070f3"
                : "2px solid transparent",
            fontWeight: tab === "challenge" ? "bold" : "normal",
            cursor: tab === "challenge" ? "default" : "pointer",
            outline: "none",
          }}
        >
          Desafios
        </button>
        <button
          onClick={() => {
            if (tab !== "free") {
              setTab("free");
            }
          }}
          style={{
            padding: "12px 24px",
            border: "none",
            background: tab === "free" ? "#fff" : "transparent",
            borderBottom:
              tab === "free" ? "2px solid #0070f3" : "2px solid transparent",
            fontWeight: tab === "free" ? "bold" : "normal",
            cursor: tab === "free" ? "default" : "pointer",
            outline: "none",
          }}
        >
          Livre
        </button>
      </div>
      {/* Loader visual ao trocar de aba */}

      {/* Conteúdo das abas */}
<ChallengeVoxelsProvider>
  <div
    ref={containerRef}
    style={{ display: "flex", flex: 1, minHeight: 0 }}
  >
    <div
      style={{
        flexBasis: `33%`,
        borderRight: "1px solid #eee",
        minWidth: 0,
      }}
    >
      <LeftPanel
        code={code}
        setCode={setCode}
        selectedChallengeId={tab === 'challenge' ? selectedChallengeId : null}
        setSelectedChallengeId={setSelectedChallengeId}
        mainTab={tab}
      />
    </div>
    <div
      onMouseDown={handleMouseDown}
      style={{
        width: "5px",
        cursor: "col-resize",
        background: "#eee",
        flexShrink: 0,
      }}
    />
    <div style={CONTAINER_LADO_DIREITO}>
      <RightPanel
        code={debouncedCode}
        perfOffset={0}
        selectedChallengeId={tab === 'challenge' ? selectedChallengeId : null}
        tab={tab}
      />
    </div>
  </div>
</ChallengeVoxelsProvider>    </div>
  );
}
