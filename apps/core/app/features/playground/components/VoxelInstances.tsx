import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";
import { RoundedBoxGeometry } from "three-stdlib";
import type { VoxelData } from "../types";

interface VoxelInstancesProps {
  voxels: VoxelData[];
  bounds?: number;
}

export function VoxelInstances({ voxels, bounds = 1 }: VoxelInstancesProps) {
  console.log("voxel data", voxels);

  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const geometry = useMemo(() => {
    console.log("Creating new geometry", bounds, voxels.length);
    return new RoundedBoxGeometry(bounds, bounds, bounds, 4, 0.2);
  }, [bounds, voxels.length]);
  const instanceCount = voxels.length;

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.count = instanceCount;
  }, [instanceCount]);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    for (let i = 0; i < voxels.length; i++) {
      const voxel = voxels[i];
      dummy.position.set(
        voxel.position[0],
        voxel.position[1],
        voxel.position[2],
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, color.set(voxel.color || "#ffffff"));
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  }, [voxels]);

  console.log("remount", instanceCount, voxels.length);
  // Cria uma chave que muda quando os dados dos voxels mudam (posições/cores)
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
