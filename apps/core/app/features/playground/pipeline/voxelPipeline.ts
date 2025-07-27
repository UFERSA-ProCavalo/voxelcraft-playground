import type { VoxelData } from "../types";

export type VoxelPipelineStep = (voxels: VoxelData[]) => VoxelData[];

import { faceCulling } from "./faceCulling.ts";

export const faceCullingStep: VoxelPipelineStep = (voxels) =>
  faceCulling(voxels);

export function runVoxelPipeline(
  voxels: VoxelData[],
  steps: VoxelPipelineStep[],
): VoxelData[] {
  return steps.reduce((data, step) => step(data), voxels);
}
