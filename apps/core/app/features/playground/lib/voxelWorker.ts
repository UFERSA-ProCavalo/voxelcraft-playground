// Worker responsável por processar o código do usuário e gerar voxels.
import type { VoxelData } from "../types";

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

import { runVoxelPipeline, faceCullingStep } from "../pipeline/voxelPipeline";

self.onmessage = function (e: MessageEvent<WorkerInput>) {
  const { code, gridSize, bounds, colorMap } = e.data;
  let voxels: VoxelData[] = [];
  try {
    // Compila a função do usuário
    const userFn = new Function("x", "y", "z", code) as (
      x: number,
      y: number,
      z: number,
    ) => number;
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
            color: colorMap[colorIdx] || "#888",
          });
        }
      }
    }
    const culledVoxels = runVoxelPipeline(voxels, [faceCullingStep]);
    (self as any).postMessage({ voxels: culledVoxels } as WorkerOutput);
  } catch (err: any) {
    (self as any).postMessage({ error: err.message } as WorkerOutput);
  }
};
