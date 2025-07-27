import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
// import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import type { VoxelData } from "~/features/playground/types";
import { COLOR_MAP } from "~/features/playground/consts";
import { VoxelInstances } from "~/features/playground/components/VoxelInstances";
import { CommonSceneElements } from "../CommonSceneElements";
import { mapVoxelPositions } from "../utils";

export interface SceneProps {
  perfOffset?: number;
  bounds?: number;
  gridSize?: number;
  code?: string;
  voxels?: VoxelData[];
  showAxes?: boolean;
  showOutline?: boolean;
}

export function Scene({
  // perfOffset = 0,
  bounds = 1,
  gridSize = 32,
  code,
  voxels: voxelsProp,
  showAxes = true,
  showOutline = true,
}: SceneProps) {
  const [voxels, setVoxels] = useState<VoxelData[]>([]);
  // const [workerError, setWorkerError] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const spacing = bounds - 0.1;

  useEffect(() => {
    if (voxelsProp) return;
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL("../../lib/voxelWorker.ts", import.meta.url),
        { type: "module" },
      );
    }
    const worker = workerRef.current;
    worker.onmessage = (e) => {
      if (e.data.error) {
        setVoxels([]);
      } else {
        setVoxels(e.data.voxels);
      }
    };
    if (code) {
      worker.postMessage({ code, gridSize, bounds, colorMap: COLOR_MAP });
    }
    return () => {
      // worker.terminate();
    };
  }, [code, gridSize, bounds, voxelsProp]);

  const cameraDistance = gridSize * bounds * 1.15;
  const cameraPosition: [number, number, number] = [
    cameraDistance,
    cameraDistance,
    cameraDistance,
  ];
  const voxelsToRender = voxelsProp ?? voxels;

  return (
    <Canvas
      style={{ height: "100%", width: "100%" }}
      camera={{ position: cameraPosition, fov: 50 }}
    >
      <CommonSceneElements
        gridSize={gridSize}
        bounds={bounds}
        spacing={spacing}
        showAxes={showAxes}
        showOutline={showOutline}
      >
        <VoxelInstances
voxels={mapVoxelPositions(voxelsToRender, spacing)}          bounds={bounds}
        />
      </CommonSceneElements>
      <OrbitControls enableDamping makeDefault />
      {/* <Perf position="top-right" style={{ top: perfOffset }} /> */}
    </Canvas>
  );
}
