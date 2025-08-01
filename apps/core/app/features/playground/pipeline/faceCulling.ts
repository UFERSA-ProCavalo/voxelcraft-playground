/**
 * Remove faces internas dos voxels (face culling).
 *
 * @param {Array<{ position: [number, number, number], [key: string]: any }>} voxels - Array de voxels com posições e propriedades.
 * @returns {Array<{ position: [number, number, number], [key: string]: any }>} Array de voxels visíveis (sem faces internas).
 */
import { faceDirs } from "../consts";

export function faceCulling(
  voxels: Array<{ position: [number, number, number]; [key: string]: any }>,
): Array<{ position: [number, number, number]; [key: string]: any }> {
  const voxelSet = new Set(voxels.map((v) => v.position.join(",")));
  return voxels.filter((voxel) => {
    return faceDirs.some(
      ([dx, dy, dz]) =>
        !voxelSet.has(
          [
            voxel.position[0] + dx,
            voxel.position[1] + dy,
            voxel.position[2] + dz,
          ].join(","),
        ),
    );
  });
}
