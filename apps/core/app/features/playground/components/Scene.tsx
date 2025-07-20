import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { useMemo } from 'react';
import { OrbitControls } from '@react-three/drei';
import type { VoxelData } from '../types';
import { COLOR_MAP } from '../consts';
import { VoxelInstances } from './VoxelInstances';
import { AxesCylinders } from './AxesCylinders';
import { GridOutline } from './GridOutline';
import { runVoxelPipeline, faceCullingStep } from '../pipeline/voxelPipeline';

export interface SceneProps {
  perfOffset?: number;
  bounds?: number;
  gridSize?: number;
  code: string;
}

/**
 * Renderiza um voxel com contorno.
 */
// function Voxel({ voxel, bounds = 1 }: { voxel: VoxelData; bounds?: number }) {
//   //const geometryRef = useRef<THREE.BoxGeometry>(null);
//   const size = voxel.size ?? [bounds, bounds, bounds];
//   return (
//     <group position={voxel.position}>
//       <RoundedBox args={size} radius={0.2} smoothness={1}>
//         <meshStandardMaterial color={voxel.color ?? "orange"} />
//       </RoundedBox>
//     </group>
//   );
// }

export function Scene({ perfOffset = 0, bounds = 1, gridSize = 32, code }: SceneProps) {
  const voxelData: VoxelData[] = [];
  //const spacing = bounds * 1.15;
  const spacing = bounds - 0.1; // Ajuste fino para evitar sobreposição
  // Para os limites do objeto ( -N/2 to +N/2)
  const half = Math.floor(gridSize / 2);

  // Compila o código do usuário em uma função
  const userFn = useMemo(() => {
    try {
      return new Function('x', 'y', 'z', code) as (x: number, y: number, z: number) => number;
    } catch (e) {
      return null;
    }
  }, [code]);

  for (let x = -half; x <= half; x++) {
    for (let y = -half; y <= half; y++) {
      for (let z = -half; z <= half; z++) {
        let colorIdx = 0;
        if (userFn) {
          try {
            colorIdx = userFn(x, y, z);
          } catch {
            colorIdx = 0;
          }
        }
        if (!Number.isFinite(colorIdx) || colorIdx <= 0) continue; // Transparente, não renderiza
        // Adiciona o voxel com a cor correspondente
        voxelData.push({
          position: [x, y, z],
          color: COLOR_MAP[colorIdx] || '#888',
        });
      }
    }
  }

  const cameraDistance = gridSize * bounds * 1.15;
  const cameraPosition: [number, number, number] = [cameraDistance, cameraDistance, cameraDistance];

  // --- Pipeline ---
  const pipeline = [faceCullingStep];
  const processedVoxels = runVoxelPipeline(voxelData, pipeline);

  return (
    <Canvas
      style={{ height: '100%', width: '100%' }}
      camera={{ position: cameraPosition, fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={0.8} />
      <directionalLight position={[-5, -10, -7]} intensity={0.8} />

      {/* Light helpers for debugging: comment out to hide */}
      {/* <primitive object={new THREE.CameraHelper(new THREE.DirectionalLight(0xffffff, 0.6).shadow.camera)} /> */}
      {/* <primitive object={new THREE.DirectionalLightHelper(new THREE.DirectionalLight(0xffffff, 0.6), 2)} /> */}
      {/* <AxesCylinders gridSize={gridSize} /> */}
      {/* <GridOutline gridSize={gridSize} bounds={bounds} spacing={spacing} /> */}
      <VoxelInstances
        voxels={processedVoxels.map((v) => ({
          ...v,
          position: [v.position[0] * spacing, v.position[1] * spacing, v.position[2] * spacing],
        }))}
        bounds={bounds}
      />
      {/* <FaceCulling /> */}
      <OrbitControls enableDamping makeDefault />
      <Perf position="top-right" style={{ top: perfOffset }} />
    </Canvas>
  );
}
