import React, { useState, useRef, useCallback, useEffect } from "react";
import { useOutletContext } from "react-router";
import { LeftPanel } from "../components/LeftPanel/LeftPanel";
import { RightPanel } from "../components/RightPanel/RightPanel";
import { useDebounce } from "@libs/utils";

import { ChallengeVoxelsProvider } from "../lib/ChallengeVoxelsProvider";

export default function PlaygroundPage() {
  const [code, setCode] = useState("// Write code here\n");
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(
    null,
  );
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
    <ChallengeVoxelsProvider>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
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
              selectedChallengeId={selectedChallengeId}
              setSelectedChallengeId={setSelectedChallengeId}
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
          <div style={{ flexBasis: `66%`, minWidth: 0 }}>
            <RightPanel
              code={debouncedCode}
              perfOffset={headerHeight}
              selectedChallengeId={selectedChallengeId}
            />
          </div>
        </div>
      </div>
    </ChallengeVoxelsProvider>
  );
}
