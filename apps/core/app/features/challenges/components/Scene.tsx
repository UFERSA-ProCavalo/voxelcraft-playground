import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

export interface SceneProps {
  perfOffset?: number;
  reference?: boolean;
}

export function Scene({ perfOffset = 0, reference = false }: SceneProps) {
  return (
    <Canvas style={{ height: "100%", width: "100%" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={reference ? "blue" : "orange"} />
      </mesh>
      {!reference && <Perf position="top-right" />}
    </Canvas>
  );
}
