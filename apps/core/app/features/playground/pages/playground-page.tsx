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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";

export default function PlaygroundPage() {
  const [tab, setTab] = useState<string>("challenge");

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
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="flex-1 flex flex-col min-h-0 relative"
      >
        {/* Floating, centered TabsList */}
        <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2 flex justify-center w-auto">
          <TabsList className="shadow-lg bg-background rounded-xl px-6 py-2 flex gap-2 border border-border">
            <TabsTrigger value="challenge">Desafios</TabsTrigger>
            <TabsTrigger value="free">Livre</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="challenge" className="flex-1 flex flex-col min-h-0">
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
                    selectedChallengeId={selectedChallengeId}
                    setSelectedChallengeId={setSelectedChallengeId}
                    mainTab={tab as "challenge" | "free"}
                  />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={67} minSize={20}>
                  <RightPanel
                    code={debouncedCode}
                    perfOffset={0}
                    selectedChallengeId={selectedChallengeId}
                    tab={tab as "challenge" | "free"}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </ChallengeVoxelsProvider>
        </TabsContent>
        <TabsContent value="free" className="flex-1 flex flex-col min-h-0">
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
                    selectedChallengeId={null}
                    setSelectedChallengeId={setSelectedChallengeId}
                    mainTab={tab as "challenge" | "free"}
                  />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={67} minSize={20}>
                  <RightPanel
                    code={debouncedCode}
                    perfOffset={0}
                    selectedChallengeId={null}
                    tab={tab as "challenge" | "free"}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </ChallengeVoxelsProvider>
        </TabsContent>
      </Tabs>
    </div>
  );
}
