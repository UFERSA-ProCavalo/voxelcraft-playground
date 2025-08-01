import type { VoxelData } from "./types";

function hexToRgbNorm(hex: string): [number, number, number] {
  // Remove # se existir
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(hex, 16);
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  ];
}

export function exportVoxelsToObjMtl(
  voxels: VoxelData[],
  options?: { cubeSize?: number; mtlName?: string; objName?: string },
): { obj: string; mtl: string } {
  const cubeSize = options?.cubeSize ?? 1;
  const mtlName = options?.mtlName ?? "voxels.mtl";
  // 1. Materiais únicos por cor
  const colorSet = new Set<string>();
  for (const v of voxels) colorSet.add(v.color || "#ffffff");
  const colors = Array.from(colorSet);

  // 2. Gera MTL
  let mtl = "";
  for (const color of colors) {
    const rgb = hexToRgbNorm(color.startsWith("#") ? color : "#" + color);
    mtl += `newmtl color_${color.replace("#", "")}
Kd ${rgb[0].toFixed(4)} ${rgb[1].toFixed(4)} ${rgb[2].toFixed(4)}
\n`;
  }

  // 3. Gera OBJ
  let obj = `mtllib ${mtlName}\n`;
  let vertCount = 0;
  for (const voxel of voxels) {
    const [x, y, z] = voxel.position;
    const color = voxel.color || "#ffffff";
    const matName = `color_${color.replace("#", "")}`;
    // 8 vértices do cubo
    const half = cubeSize / 2;
    const verts = [
      [x - half, y - half, z - half],
      [x + half, y - half, z - half],
      [x + half, y + half, z - half],
      [x - half, y + half, z - half],
      [x - half, y - half, z + half],
      [x + half, y - half, z + half],
      [x + half, y + half, z + half],
      [x - half, y + half, z + half],
    ];
    for (const v of verts) {
      obj += `v ${v[0]} ${v[1]} ${v[2]}\n`;
    }
    obj += `usemtl ${matName}\n`;
    // Faces (cada face é um quad)
    // Indices dos vértices (1-based, ordem: baixo, cima, frente, trás, direita, esquerda)
    const idx = vertCount;
    obj += `f ${idx + 1} ${idx + 2} ${idx + 3} ${idx + 4}\n`;
    obj += `f ${idx + 5} ${idx + 6} ${idx + 7} ${idx + 8}\n`;
    obj += `f ${idx + 1} ${idx + 2} ${idx + 6} ${idx + 5}\n`;
    obj += `f ${idx + 2} ${idx + 3} ${idx + 7} ${idx + 6}\n`;
    obj += `f ${idx + 3} ${idx + 4} ${idx + 8} ${idx + 7}\n`;
    obj += `f ${idx + 4} ${idx + 1} ${idx + 5} ${idx + 8}\n`;
    vertCount += 8;
  }
  return { obj, mtl };
}
