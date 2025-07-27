import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { NodeVM } from "vm2";

import { challenges } from "../app/features/playground/challenges.ts";
import type { VoxelData } from "../app/features/playground/types.ts";
import {
  runVoxelPipeline,
  faceCullingStep,
} from "../app/features/playground/pipeline/voxelPipeline.ts";

async function generateVoxelsForChallenge(code: string): Promise<VoxelData[]> {
  const voxels: VoxelData[] = [];
  const addVoxel = (x: number, y: number, z: number, color?: string) => {
    voxels.push({ position: [x, y, z], color });
  };
  const vm = new NodeVM({
    sandbox: { addVoxel },
    console: "off",
    eval: false,
    wasm: false,
    require: false,
  });
  try {
    vm.run(code, "challenge.js");
  } catch (err) {
    console.error("Error running challenge code:", err);
  }
  return runVoxelPipeline(voxels, [faceCullingStep]);
}

async function main() {
  const output: { id: string; name: string; voxels: VoxelData[] }[] = [];
  for (const challenge of challenges) {
    let voxels: VoxelData[] = [];
    try {
      voxels = await generateVoxelsForChallenge(challenge.starterCode);
    } catch (err) {
      console.error(
        `Error generating voxels for challenge ${challenge.id}:`,
        err,
      );
    }
    output.push({
      id: challenge.id,
      name: challenge.name,
      voxels,
    });
  }
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const outPath = path.join(__dirname, "challenges-with-voxels.json");
  await fs.writeFile(outPath, JSON.stringify(output, null, 2), "utf-8");
  console.log("Generated", outPath);
}

main().catch((err) => {
  console.error("Error generating challenge voxels:", err);
  process.exit(1);
});
