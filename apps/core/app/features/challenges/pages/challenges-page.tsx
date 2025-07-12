import { useState } from "react";
import { useOutletContext } from "react-router";
import { CodeEditor } from "../components/CodeEditor";
import { Scene } from "../components/Scene";

export default function ChallengesPage() {
  const [code, setCode] = useState("// Write code here\n");
  const { headerHeight = 0 } = useOutletContext() as { headerHeight: number };

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flex: 1 }}>
      {/* Left column: Code Editor (spans both rows) */}
      <div style={{ flex: 1, borderRight: "1px solid #eee", minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <CodeEditor code={code} onChange={setCode} />
      </div>
      {/* Right column: Two stacked canvases */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ flex: 1, minHeight: 0, borderBottom: '1px solid #eee' }}>
          <Scene perfOffset={headerHeight} reference />
        </div>
        <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
          <Scene perfOffset={0} />
        </div>
      </div>
    </div>
  );
}
