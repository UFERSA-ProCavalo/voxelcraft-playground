import { useState } from "react";
import { useOutletContext } from "react-router";
import { CodeEditor } from "../components/CodeEditor";
import { Scene } from "../components/Scene";
import { useDebounce } from "@libs/utils";

export default function PlaygroundPage() {
  const [code, setCode] = useState("// Write code here\n");
  const debouncedCode = useDebounce(code, 200);
  const { headerHeight = 0 } = useOutletContext() as { headerHeight: number };

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 1, borderRight: "1px solid #eee", minWidth: 0 }}>
          <CodeEditor code={code} onChange={setCode} />
        </div>
        <div style={{ flex: 1, minWidth: 0}}>
          <Scene perfOffset={headerHeight} code={code} />
        </div>
      </div>
    </div>
  );
}
