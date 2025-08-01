// Worker responsável por processar o código do usuário e gerar voxels.
import type { VoxelData } from "../types";
import { runVoxelPipeline, faceCullingStep } from "../pipeline/voxelPipeline";
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

function interpolateRGB(
  color1: [number, number, number],
  color2: [number, number, number],
  t: number,
): [number, number, number] {
  const clamp = (value: number, min = 0, max = 1) =>
    Math.max(min, Math.min(max, value));
  t = clamp(t);

  const r = Math.round(color1[0] + (color2[0] - color1[0]) * t);
  const g = Math.round(color1[1] + (color2[1] - color1[1]) * t);
  const b = Math.round(color1[2] + (color2[2] - color1[2]) * t);

  return [r, g, b];
}

function hexToRgb(hex: string): [number, number, number] | null {
  // Remove o # se estiver presente
  hex = hex.replace(/^#/, "");

  if (hex.length !== 6) {
    return null;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}

function rgbToHex(rgb: [number, number, number]): string {
  const [r, g, b] = rgb;
  const toHex = (c: number) => c.toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

self.onmessage = function (e: MessageEvent<WorkerInput>) {
  const { code, gridSize, bounds, colorMap } = e.data;
  let voxels: VoxelData[] = [];
  try {
    // Compila a função do usuário
    let userFn = new Function("x", "y", "z", "time", code) as (
      x: number,
      y: number,
      z: number,
      time: number,
    ) => number;

    const half = Math.floor(gridSize / 2);
    // Gera os voxels de acordo com o código do usuário
    let now = new Date();
    let time =
      now.getMilliseconds() / 1000 + now.getSeconds() + now.getMinutes() * 60;

    for (let x = -half; x <= half; x++) {
      for (let y = -half; y <= half; y++) {
        for (let z = -half; z <= half; z++) {
          let colorIdx = 0;
          try {
            colorIdx = userFn(x, y, z, time);
          } catch {
            colorIdx = 0;
          }
          // Ignora valores inválidos ou não positivos
          if (!Number.isFinite(colorIdx) || colorIdx <= 0) continue;

          let color1 = colorMap[Math.floor(colorIdx)] || "#888888";
          let color2 = colorMap[Math.floor(colorIdx) + 1] || "#888888";
          let t = colorIdx - Math.floor(colorIdx);

          const defaultRgb: [number, number, number] = [136, 136, 136]; // #888888
          const rgb1 = hexToRgb(color1) ?? defaultRgb;
          const rgb2 = hexToRgb(color2) ?? defaultRgb;

          let color = rgbToHex(interpolateRGB(rgb1, rgb2, t));

          voxels.push({
            position: [x, y, z],
            color: color,
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
