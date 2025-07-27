// Utility for mapping voxel positions with spacing and bounds
import type { VoxelData } from "../types";

/**
 * Maps voxel positions using the given spacing.
 * @param voxels Array of VoxelData
 * @param spacing number
 * @returns Array of VoxelData with mapped positions
 */
export function mapVoxelPositions(
  voxels: VoxelData[],
  spacing: number,
): VoxelData[] {
  return voxels.map((v) => ({
    ...v,
    position: [
      v.position[0] * spacing,
      v.position[1] * spacing,
      v.position[2] * spacing,
    ],
  }));
}
