import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import { RoundedBoxGeometry } from "three-stdlib";
import type { VoxelData } from "../types";
import { FaceCulling } from "./FaceCulling";

// Cores para o retorno pelo código do usuário
const COLOR_MAP: Record<number, string> = {
  1: '#e74c3c', // vermelho
  2: '#27ae60', // verde
  3: '#2980b9', // azul
  4: '#f1c40f', // amarelo
  5: '#8e44ad', // roxo
  6: '#e67e22', // laranja
  7: '#1abc9c', // ciano
  8: '#34495e', // cinza escuro
  9: '#ecf0f1', // branco
};

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

function VoxelInstances({ voxels, bounds = 1 }: { voxels: VoxelData[]; bounds?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const prevVoxelsRef = useRef<VoxelData[]>([]);
  const geometry = useMemo(() => new RoundedBoxGeometry(bounds, bounds, bounds, 4, 0.2), [bounds]);
  const instanceCount = voxels.length;

  // Inicializa o mesh com a quantidade de instâncias
  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.count = instanceCount;
  }, [instanceCount]);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    let colorChanged = false;
    let matrixChanged = false;

    for (let i = 0; i < voxels.length; i++) {
      const voxel = voxels[i];
      const prevVoxel = prevVoxelsRef.current[i];

      // Verifica se a posição mudou ou é o primeiro render
      if (
        !prevVoxel ||
        voxel.position[0] !== prevVoxel.position[0] ||
        voxel.position[1] !== prevVoxel.position[1] ||
        voxel.position[2] !== prevVoxel.position[2]
      ) {
        dummy.position.set(voxel.position[0], voxel.position[1], voxel.position[2]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        matrixChanged = true;
      }

      // Update color if changed or on first render
      if (!prevVoxel || voxel.color !== prevVoxel.color) {
        meshRef.current.setColorAt(i, color.set(voxel.color || "#ffffff"));
        colorChanged = true;
      }
    }

    if (matrixChanged) meshRef.current.instanceMatrix.needsUpdate = true;
    if (colorChanged && meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

    // Save current voxels for next diff
    prevVoxelsRef.current = voxels;
  }, [voxels]);

  return (
    // @ts-ignore
    <instancedMesh ref={meshRef} args={[geometry, undefined, instanceCount]}>
      <meshStandardMaterial />
    </instancedMesh>
  );
}


function AxesCylinders({ gridSize }: { gridSize: number }) {
  const half = Math.floor(gridSize / 2);
  const length = half + 0.5; // Extends to the edge of the grid
  const radius = Math.max(0.03 * gridSize, 0.05); // Proportional thickness
  const cylArgs = [radius, radius, length, 16] as [number, number, number, number];
  const coneHeight = radius * 4;
  const coneRadius = radius * 2;
  const coneArgs = [coneRadius, coneHeight, 16] as [number, number, number];
  return (
    <group>
      {/* X axis: red */}
      <mesh position={[length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={cylArgs} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[length, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={coneArgs} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Y axis: green */}
      <mesh position={[0, length / 2, 0]}>
        <cylinderGeometry args={cylArgs} />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh position={[0, length, 0]}>
        <coneGeometry args={coneArgs} />
        <meshStandardMaterial color="green" />
      </mesh>
      {/* Z axis: blue */}
      <mesh position={[0, 0, length / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={cylArgs} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[0, 0, length]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={coneArgs} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
}


// --- Pipeline ---
type VoxelPipelineStep = (voxels: VoxelData[]) => VoxelData[];

// Logging da quantidade de voxels
const logStep: VoxelPipelineStep = (voxels) => {
  console.log('Pipeline: Voxel count:', voxels.length);
  return voxels;
};

// Direções das faces (x, y, z) para cada face do voxel
const faceCullingStep: VoxelPipelineStep = (voxels) => {
  const voxelSet = new Set(voxels.map(v => v.position.join(',')));
  const faceDirs = [
    [1, 0, 0], [-1, 0, 0],
    [0, 1, 0], [0, -1, 0],
    [0, 0, 1], [0, 0, -1],
  ];
  return voxels.filter(voxel => {
    // Verifica se pelo menos uma face do voxel está exposta
    return faceDirs.some(([dx, dy, dz]) => 
      !voxelSet.has([
        voxel.position[0] + dx,
        voxel.position[1] + dy,
        voxel.position[2] + dz
      ].join(','))
    );
  });
};

function runVoxelPipeline(voxels: VoxelData[], steps: VoxelPipelineStep[]): VoxelData[] {
  return steps.reduce((data, step) => step(data), voxels);
}

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
  const pipeline: VoxelPipelineStep[] = [
  faceCullingStep,
];
  const processedVoxels = runVoxelPipeline(voxelData, pipeline);

   function GridOutline({ gridSize, bounds, spacing }: { gridSize: number; bounds: number; spacing: number }) {
     // Cria uma grade de linhas ao redor do grid
     const size = (gridSize) * spacing + 1.15; // Tamanho total da grade
     const geometry = new RoundedBoxGeometry(size, size, size, 4, 0.1) as THREE.BufferGeometry;
     return (
       <lineSegments>
         <edgesGeometry args={[geometry as any]} />
         <lineBasicMaterial color="white" linewidth={1} />
       </lineSegments>
     );
   }

   return (
     <Canvas style={{ height: "100%", width: "100%" }} camera={{ position: cameraPosition, fov: 50 }}>
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7]} intensity={0.8} />
        <directionalLight position={[-5, -10, -7]} intensity={0.8} />
       

        {/* Light helpers for debugging: comment out to hide */}
        {/* <primitive object={new THREE.CameraHelper(new THREE.DirectionalLight(0xffffff, 0.6).shadow.camera)} /> */}
        {/* <primitive object={new THREE.DirectionalLightHelper(new THREE.DirectionalLight(0xffffff, 0.6), 2)} /> */}
        {/* <AxesCylinders gridSize={gridSize} /> */}
       {/* <GridOutline gridSize={gridSize} bounds={bounds} spacing={spacing} /> */}
        <VoxelInstances voxels={processedVoxels.map(v => ({...v, position: [v.position[0] * spacing, v.position[1] * spacing, v.position[2] * spacing]}))} bounds={bounds} />
      {/* <FaceCulling /> */}
       <OrbitControls enableDamping makeDefault />
       <Perf position="top-right" style={{ top: perfOffset }} />
     </Canvas>
   );}
