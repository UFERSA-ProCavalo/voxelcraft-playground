import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
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
function Voxel({ voxel, bounds = 1 }: { voxel: VoxelData; bounds?: number }) {
  const geometryRef = useRef<THREE.BoxGeometry>(null);
  const size = voxel.size ?? [bounds, bounds, bounds];
  return (
    <group position={voxel.position}>
      <mesh castShadow receiveShadow>
        <boxGeometry ref={geometryRef} args={size} />
        {/* <meshStandardMaterial color={voxel.color ?? "orange"} wireframe /> */}
        <meshStandardMaterial color={voxel.color ?? "orange"}  />
      </mesh>
      {geometryRef.current && (
        <lineSegments>
          {/* TypeScript workaround: geometryRef.current as any 
          * Ajustar o tipo de geometryRef para evitar erro de tipagem
          */}
          {/*<edgesGeometry args={[geometryRef.current as any]} />
          <lineBasicMaterial color="black" linewidth={1} />*/}
        </lineSegments>
      )}
    </group>
  );
}

function AxesCylinders({ bounds = 1, radius = 0.08 }: { bounds?: number; radius?: number }) {
  const length = bounds + 1;
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

export function Scene({ perfOffset = 0, bounds = 1, gridSize = 10, code }: SceneProps) {
  const voxelData: VoxelData[] = [];
  const spacing = bounds * 1.15;
  const half = Math.floor(gridSize / 2);

  // Compila o código do usuário em uma função
  let userFn: ((x: number, y: number, z: number) => number) | null = null;
  try {
    userFn = new Function('x', 'y', 'z', code) as (x: number, y: number, z: number) => number;
  } catch (e) {
    // Código inválido, não renderiza nada
    userFn = null;
  }

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
        voxelData.push({
          position: [x * spacing, y * spacing, z * spacing],
          color: COLOR_MAP[colorIdx] || '#888',
        });
      }
    }
  }

  const cameraDistance = gridSize * bounds * 1.5;
  const cameraPosition: [number, number, number] = [cameraDistance, cameraDistance, cameraDistance];

  return (
    <Canvas style={{ height: "100%", width: "100%" }} camera={{ position: cameraPosition, fov: 50 }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={0.8} castShadow />
      <AxesCylinders bounds={bounds} radius={0.08} />
      {voxelData.map((voxel) => (
        <Voxel key={voxel.position.join(",")} voxel={voxel} bounds={bounds} />
      ))}
      {/* <FaceCulling /> */}
      <OrbitControls enableDamping makeDefault />
      <Perf position="top-right" style={{ top: perfOffset }} />
    </Canvas>
  );
}
