import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { ErrorBoundary } from "~/root";

export interface SceneProps {
  perfOffset?: number;
}

export function Scene({ perfOffset = 0 }: SceneProps) {
  return (
    <Canvas style={{ height: "100%", width: "100%" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <Perf position="top-right" style={{ top: perfOffset }} />
    </Canvas>
  );
}
