// Worker responsável por processar o código do usuário e gerar voxels.
import type { VoxelData } from '../types';

interface WorkerInput {
  code: string;
  gridSize: number;
  bounds: number;
  colorMap: string[];
}

interface WorkerOutput {
  voxels?: VoxelData[];
  error?: string;
}

import { faceDirs } from '../consts';

function faceCulling(voxels: VoxelData[]): VoxelData[] {
  const voxelSet = new Set(voxels.map((v) => v.position.join(',')));
  return voxels.filter((voxel) =>
    faceDirs.some(
      ([dx, dy, dz]) =>
        !voxelSet.has(
          [voxel.position[0] + dx, voxel.position[1] + dy, voxel.position[2] + dz].join(',')
        )
    )
  );
}

self.onmessage = function (e: MessageEvent<WorkerInput>) {
  const { code, gridSize, bounds, colorMap } = e.data;
  let voxels: VoxelData[] = [];
  try {
    // Compila a função do usuário
    const userFn = new Function('x', 'y', 'z', code) as (x: number, y: number, z: number) => number;
    const half = Math.floor(gridSize / 2);
    // Gera os voxels de acordo com o código do usuário
    for (let x = -half; x <= half; x++) {
      for (let y = -half; y <= half; y++) {
        for (let z = -half; z <= half; z++) {
          let colorIdx = 0;
          try {
            colorIdx = userFn(x, y, z);
          } catch {
            colorIdx = 0;
          }
          // Ignora valores inválidos ou não positivos
          if (!Number.isFinite(colorIdx) || colorIdx <= 0) continue;
          voxels.push({
            position: [x, y, z],
            color: colorMap[colorIdx] || '#888',
          });
        }
      }
    }
    const culledVoxels = faceCulling(voxels);
    (self as any).postMessage({ voxels: culledVoxels } as WorkerOutput);
  } catch (err: any) {
    (self as any).postMessage({ error: err.message } as WorkerOutput);
  }
};
