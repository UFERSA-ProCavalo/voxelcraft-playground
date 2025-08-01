// Script para gerar voxels dos desafios a partir do starterCode
import { challenges } from "../challenges";
import { COLOR_MAP } from "../consts";
import { runVoxelPipeline, faceCullingStep } from "../pipeline/voxelPipeline";
import type { VoxelData } from "../types";
import * as fs from "fs";
import * as path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Parâmetros padrão do grid
const GRID_SIZE = 32; // igual ao worker
const colorMapArr = [null, ...Object.values(COLOR_MAP)];

function runStarterCode(code: string): VoxelData[] {
  // Executa o código do usuário em sandbox restrito
  // O starterCode pode ser de dois tipos: função (return idx) ou procedural (addVoxel)
  const voxels: VoxelData[] = [];
  // Suporte a addVoxel procedural
  function addVoxel(
    x: number,
    y: number,
    z: number,
    color: string | number = 1,
  ) {
    let colorStr =
      typeof color === "number" ? colorMapArr[color] || "#888" : color;
    voxels.push({ position: [x, y, z], color: colorStr });
  }
  // Primeiro tenta executar proceduralmente, expondo addVoxel (igual ao playground)
  let ranProcedural = false;
  try {
    // eslint-disable-next-line no-new-func
    const userScript = new Function("addVoxel", code);
    userScript(addVoxel);
    ranProcedural = voxels.length > 0;
  } catch (e) {
    // erro de sintaxe, ignora
  }
  // Se não gerou nada, tenta como função (return idx)
  if (!ranProcedural) {
    let fn: ((x: number, y: number, z: number) => number) | null = null;
    try {
      fn = new Function("x", "y", "z", code) as (
        x: number,
        y: number,
        z: number,
      ) => number;
    } catch {}
    if (fn) {
      const half = Math.floor(GRID_SIZE / 2);
      for (let x = -half; x <= half; x++) {
        for (let y = -half; y <= half; y++) {
          for (let z = -half; z <= half; z++) {
            let colorIdx = 0;
            try {
              colorIdx = fn(x, y, z);
            } catch {
              colorIdx = 0;
            }
            if (!Number.isFinite(colorIdx) || colorIdx <= 0) continue;
            voxels.push({
              position: [x, y, z],
              color: colorMapArr[colorIdx] || "#888",
            });
          }
        }
      }
    }
  }
  return voxels;
}

function main() {
  const output = challenges.map((challenge) => {
    const voxels = runStarterCode(challenge.constructionCode);
    const culled = runVoxelPipeline(voxels, [faceCullingStep]);
    return {
      id: challenge.id,
      name: challenge.name,
      voxels: culled.map((v) => ({ position: v.position, color: v.color })),
    };
  });
  const localPath = new URL("./challenges-with-voxels.json", import.meta.url)
    .pathname;
  fs.writeFileSync(localPath, JSON.stringify(output, null, 2), "utf-8");
  // Copia para a pasta pública do app core
  const publicDir = path.resolve(__dirname, "../../../../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const destPath = path.join(publicDir, "challenges-with-voxels.json");
  if (fs.existsSync(destPath)) {
    fs.unlinkSync(destPath);
  }
  fs.copyFileSync(localPath, destPath);
  console.log(
    `Arquivo challenges-with-voxels.json gerado e copiado para ${destPath}`,
  );
}

main();
