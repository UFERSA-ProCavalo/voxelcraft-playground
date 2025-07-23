import * as THREE from 'three';
import { useRef, useMemo, useEffect } from 'react';
import { RoundedBoxGeometry } from 'three-stdlib';
import type { VoxelData } from '../types';

interface VoxelInstancesProps {
	voxels: VoxelData[];
	bounds?: number;
}

export function VoxelInstances({ voxels, bounds = 1 }: VoxelInstancesProps) {
	const meshRef = useRef<THREE.InstancedMesh>(null!);
	const prevVoxelsRef = useRef<VoxelData[]>([]);
	const geometry = useMemo(() => new RoundedBoxGeometry(bounds, bounds, bounds, 4, 0.2), [bounds]);
	const instanceCount = voxels.length;

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
			if (!prevVoxel || voxel.color !== prevVoxel.color) {
				meshRef.current.setColorAt(i, color.set(voxel.color || '#ffffff'));
				colorChanged = true;
			}
		}
		if (matrixChanged) meshRef.current.instanceMatrix.needsUpdate = true;
		if (colorChanged && meshRef.current.instanceColor)
			meshRef.current.instanceColor.needsUpdate = true;
		prevVoxelsRef.current = voxels;
	}, [voxels]);

	return (
		// @ts-ignore
		<instancedMesh ref={meshRef} args={[geometry, undefined, instanceCount]}>
			<meshStandardMaterial />
		</instancedMesh>
	);
}
