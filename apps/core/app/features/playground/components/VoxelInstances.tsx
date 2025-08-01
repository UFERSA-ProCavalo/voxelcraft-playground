import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";
import { RoundedBoxGeometry } from "three-stdlib";
import type { VoxelData } from "../types";

/**
 * Propriedades para o componente VoxelInstances.
 * voxels: array de VoxelData
 * bounds: tamanho do voxel (opcional)
 */
interface VoxelInstancesProps {
  voxels: VoxelData[];
  bounds?: number;
}

export function VoxelInstances({ voxels, bounds = 1 }: VoxelInstancesProps) {
  const prevVoxelCount = useRef(0);

  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const geometry = useMemo(() => {
    return new RoundedBoxGeometry(bounds, bounds, bounds, 4, 0.2);
  }, [bounds, voxels.length]);
  const instanceCount = voxels.length;

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.count = instanceCount;
  }, [instanceCount]);

// --- ANIMAÇÃO DE MONTAGEM DO CENTRO PRA FORA ---
useEffect(() => {
  if (!meshRef.current) return;
  const mesh = meshRef.current;
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  const currentVoxelCount = voxels.length;
  const prevCount = prevVoxelCount.current;
  
  // Se está removendo voxels, não anima, só atualiza a posição/cor
  if (currentVoxelCount <= prevCount) {
    for (let i = 0; i < currentVoxelCount; i++) {
      const voxel = voxels[i];
      dummy.position.set(...voxel.position);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.set(voxel.color || "#ffffff"));
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    prevVoxelCount.current = currentVoxelCount;
    return;
  }

  // Define a escala inicial: 1 para voxels antigos, 0 para novos
  for (let i = 0; i < currentVoxelCount; i++) {
    const voxel = voxels[i];
    dummy.position.set(...voxel.position);
    dummy.scale.setScalar(i < prevCount ? 1 : 0); // 1 para antigos, 0 para novos
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    mesh.setColorAt(i, color.set(voxel.color || "#ffffff"));
  }
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

  // Animação de montagem para os novos voxels
  const duration = 0.3;
  let start: number | null = null;
  
  function animate(ts: number) {
    if (start === null) start = ts;
    const elapsed = (ts - start) / 1000;
    let t = Math.min(elapsed / duration, 1);
    t = 1 - Math.pow(1 - t, 2); // ease out

    // Anima apenas os novos voxels
    for (let i = prevCount; i < currentVoxelCount; i++) {
      const voxel = voxels[i];
      dummy.position.set(...voxel.position);
      dummy.scale.setScalar(t);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    
    if (t < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
  prevVoxelCount.current = currentVoxelCount;
}, [voxels, bounds]);

  // Cria uma chave única baseada nas posições/cores dos voxels
  const meshKey = useMemo(() => {
    // Para arrays pequenos, isso é rápido e robusto
    return (
      voxels.length +
      ":" +
      voxels.map((v) => `${v.position.join(",")}:${v.color || ""}`).join("|")
    );
  }, [voxels]);

  return (
    // @ts-ignore
    <instancedMesh
      key={meshKey}
      ref={meshRef}
      args={[geometry, undefined, instanceCount]}
    >
      <meshStandardMaterial />
    </instancedMesh>
  );
}
