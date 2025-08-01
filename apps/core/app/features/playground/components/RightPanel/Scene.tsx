import { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
// import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import type { VoxelData } from "~/features/playground/types";

import { VoxelInstances } from "~/features/playground/components/VoxelInstances";
import { CommonSceneElements } from "../CommonSceneElements";
import { mapVoxelPositions } from "../utils";
import { usePlaygroundStore } from "~/store/store";
import type { RefObject } from "react";
export interface SceneProps {
  perfOffset?: number;
  bounds?: number;
  gridSize?: number;
  code?: string;
  voxels?: VoxelData[];
  showAxes?: boolean;
  showOutline?: boolean;
  preview?: boolean;
}

export function CameraSync({ controlsRef }: { controlsRef: RefObject<any> }) {
  const { camera } = useThree();
  const cameraPosition = usePlaygroundStore((s) => s.cameraPosition);
  const cameraTarget = usePlaygroundStore((s) => s.cameraTarget);
  const setCameraPosition = usePlaygroundStore((s) => s.setCameraPosition);
  const setCameraTarget = usePlaygroundStore((s) => s.setCameraTarget);

  const EPSILON = 1e-4;
  function isDifferent(
    a: [number, number, number],
    b: [number, number, number],
  ) {
    return a.some((v, i) => Math.abs(v - b[i]) > EPSILON);
  }

  // Set camera position/target from store
  useEffect(() => {
    if (!camera || !controlsRef.current) return;
    const pos = camera.position;
    if (isDifferent([pos.x, pos.y, pos.z], cameraPosition)) {
      camera.position.set(...cameraPosition);
      camera.updateProjectionMatrix();
    }
    const controls = controlsRef.current;
    if (
      isDifferent(
        [controls.target.x, controls.target.y, controls.target.z],
        cameraTarget,
      )
    ) {
      controls.target.set(...cameraTarget);
      controls.update();
    }
  }, [camera, controlsRef, cameraPosition, cameraTarget]);

  // On every frame, update store if camera/target changed
  useFrame(() => {
    if (!camera || !controlsRef.current) return;
    const pos = camera.position;
    const controls = controlsRef.current;
    const tgt = controls.target;
    const posArr: [number, number, number] = [pos.x, pos.y, pos.z];
    const tgtArr: [number, number, number] = [tgt.x, tgt.y, tgt.z];
    // Only update if changed
    if (isDifferent(posArr, cameraPosition)) {
      setCameraPosition(posArr);
    }
    if (isDifferent(tgtArr, cameraTarget)) {
      setCameraTarget(tgtArr);
    }
  });
  return null;
}

export function Scene({
  // perfOffset = 0,
  bounds = 1,
  gridSize = 32,
  code,
  voxels: voxelsProp,
  onVoxelsChange,
}: SceneProps & { onVoxelsChange?: (voxels: VoxelData[]) => void }) {
  const [voxels, setVoxels] = useState<VoxelData[]>([]);
  // const [workerError, setWorkerError] = useState<string | null>(null);

  // Notifica o pai sempre que os voxels mudam (apenas quando não é preview)
  useEffect(() => {
    if (!voxelsProp && onVoxelsChange) {
      onVoxelsChange(voxels);
    }
  }, [voxels, voxelsProp, onVoxelsChange]);
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
      const colorMap = usePlaygroundStore.getState().colorMap;
      worker.postMessage({ code, gridSize, bounds, colorMap });
    }
    return () => {
      // worker.terminate();
    };
  }, [code, gridSize, bounds, voxelsProp]);

  const cameraDistance = gridSize * bounds * 1.55;
  const cameraPosition: [number, number, number] = [
    cameraDistance,
    cameraDistance,
    cameraDistance,
  ];
  // If preview, use voxelsProp (challenge voxels); else, use computed voxels
  const voxelsToRender = voxelsProp ?? voxels;
  const controlsRef = useRef<any>(null);
  return (
    <Canvas
      style={{ height: "100%", width: "100%" }}
      camera={{ position: cameraPosition, fov: 50 }}
    >
      <CommonSceneElements
        gridSize={gridSize}
        bounds={bounds}
        spacing={spacing}
      >
        <VoxelInstances
          voxels={mapVoxelPositions(voxelsToRender, spacing)}
          bounds={bounds}
        />
      </CommonSceneElements>
      <CameraSync controlsRef={controlsRef} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        makeDefault
        enablePan={false}
      />
      {/* <Perf position="top-right" style={{ top: perfOffset }} /> */}
    </Canvas>
  );
}
