import React, { useState, useRef, useCallback, useEffect } from "react";
import { useOutletContext } from "react-router";
import { LeftPanel } from "../components/LeftPanel/LeftPanel";
import { Scene } from "../components/RightPanel/Scene";
import { useDebounce } from "@libs/utils";

import { ChallengeVoxelsProvider } from "../lib/ChallengeVoxelsProvider";
import { loadChallengeProgress } from "../lib/persistence";
import { RightPanel } from "../components/RightPanel/RightPanel";
import { FullPageLoader } from "~/components/ui/FullPageLoader";
import { TEMA_CENA } from "../components/utils";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "~/components/ui/resizable";
import { ChatButtonWithPopup } from "../components/ChatButtonWithPopup";

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

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "relative",
      }}
    >
      <ChatButtonWithPopup />
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
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <ResizablePanelGroup
            direction="horizontal"
            className="flex-1 min-h-0 h-full w-full"
          >
            <ResizablePanel defaultSize={33} minSize={20}>
              <LeftPanel
                code={code}
                setCode={setCode}
                selectedChallengeId={
                  tab === "challenge" ? selectedChallengeId : null
                }
                setSelectedChallengeId={setSelectedChallengeId}
                mainTab={tab}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={67} minSize={20}>
              <RightPanel
                code={debouncedCode}
                perfOffset={0}
                selectedChallengeId={
                  tab === "challenge" ? selectedChallengeId : null
                }
                tab={tab}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ChallengeVoxelsProvider>{" "}
    </div>
  );
}
