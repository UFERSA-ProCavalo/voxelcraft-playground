import { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

export default function PlaygroundPage() {
  const [code, setCode] = useState("// Write code here\n");

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <div style={{ flex: 1, borderRight: "1px solid #eee", minWidth: 0 }}>
        <MonacoEditor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={v => setCode(v || "")}
          theme="vs-dark"
          options={{ minimap: { enabled: false } }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Canvas style={{ height: "100vh", width: "100%" }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
          <Perf position="top-right" />
        </Canvas>
      </div>
    </div>
  );
}
