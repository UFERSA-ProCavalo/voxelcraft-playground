import { useState } from "react";
import { CodeEditor } from "../components/CodeEditor";
import { Scene } from "../components/Scene";

export default function PlaygroundPage() {
  const [code, setCode] = useState("// Write code here\n");

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 1, borderRight: "1px solid #eee", minWidth: 0 }}>
          <CodeEditor code={code} onChange={setCode} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Scene />
        </div>
      </div>
    </div>
  );
}
