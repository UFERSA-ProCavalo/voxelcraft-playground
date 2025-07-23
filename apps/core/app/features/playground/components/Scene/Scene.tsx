import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { OrbitControls } from '@react-three/drei';
import type { VoxelData } from '~/features/playground/types';
import { COLOR_MAP } from '~/features/playground/consts';
import { VoxelInstances } from '~/features/playground/components/VoxelInstances';
import { GridOutline } from './GridOutline';

export interface SceneProps {
  perfOffset?: number;
  bounds?: number;
  gridSize?: number;
  code: string;
}

export function Scene({ perfOffset = 0, bounds = 1, gridSize = 32, code }: SceneProps) {
  const [voxels, setVoxels] = useState<VoxelData[]>([]);
  const [workerError, setWorkerError] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const spacing = bounds - 0.1;

  useEffect(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(new URL('../worker/voxelWorker.js', import.meta.url));
    }
    const worker = workerRef.current;
    worker.onmessage = (e) => {
      if (e.data.error) {
        setWorkerError(e.data.error);
        setVoxels([]);
      } else {
        setWorkerError(null);
        setVoxels(e.data.voxels);
      }
    };
    worker.postMessage({ code, gridSize, bounds, colorMap: COLOR_MAP });
    return () => {
      // worker.terminate();
    };
  }, [code, gridSize, bounds]);

  const cameraDistance = gridSize * bounds * 1.15;
  const cameraPosition: [number, number, number] = [cameraDistance, cameraDistance, cameraDistance];

  return (
    <Canvas
      style={{ height: '100%', width: '100%', overflow: 'hidden' }}
      camera={{ position: cameraPosition, fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={0.8} />
      <directionalLight position={[-5, -10, -7]} intensity={0.8} />
      <VoxelInstances
        voxels={voxels.map((v) => ({
          ...v,
          position: [v.position[0] * spacing, v.position[1] * spacing, v.position[2] * spacing],
        }))}
        bounds={bounds}
      />
      <OrbitControls enableDamping makeDefault />
      <GridOutline gridSize={gridSize} bounds={bounds} spacing={spacing} />
      <Perf position="top-right" style={{ top: perfOffset }} />
    </Canvas>
  );
}
