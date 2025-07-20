import type { VoxelData } from '../types';

export type VoxelPipelineStep = (voxels: VoxelData[]) => VoxelData[];

export const faceCullingStep: VoxelPipelineStep = (voxels) => {
  const voxelSet = new Set(voxels.map((v) => v.position.join(',')));
  const faceDirs = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  return voxels.filter((voxel) => {
    return faceDirs.some(
      ([dx, dy, dz]) =>
        !voxelSet.has(
          [voxel.position[0] + dx, voxel.position[1] + dy, voxel.position[2] + dz].join(',')
        )
    );
  });
};

export function runVoxelPipeline(voxels: VoxelData[], steps: VoxelPipelineStep[]): VoxelData[] {
  return steps.reduce((data, step) => step(data), voxels);
}
