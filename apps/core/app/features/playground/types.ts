/**
 * Representa um voxel na cena.
 * @property { [number, number, number] } position - Posição do voxel [x, y, z]
 * @property { [number, number, number] } size - Tamanho do voxel [largura, altura, profundidade]. Padrão: [1, 1, 1]
 * @property {string} color - Cor do voxel (opcional)
 */
export interface VoxelData {
  position: [number, number, number];
  size?: [number, number, number];
  color?: string;
}

/**
 * Representa um quad otimizado pelo Greedy Mesh.
 * @property { [number, number, number] } pos - Posição inicial do quad [x, y, z]
 * @property { [number, number] } size - Tamanho do quad [largura, altura] no plano da face
 * @property { [number, number, number] } normal - Normal da face (direção)
 * @property {string} color - Cor do quad
 */
export interface GreedyQuad {
  pos: [number, number, number];
  size: [number, number];
  normal: [number, number, number];
  color: string;
}

/**
 * Representa um chunk de voxels.
 * @property {number} size - Tamanho do chunk (ex: 16)
 * @property {Record<string, VoxelData>} voxels - Voxels do chunk, indexados por "x,y,z"
 */
export interface Chunk {
  size: number;
  voxels: Record<string, VoxelData>;
}

// Challenge types
export type ChallengeDifficulty = "tutorial" | "iniciante" | "desafiador";
export type ChallengeProgress = "not-started" | "in-progress" | "completed";

export interface Challenge {
  id: string;
  name: string;
  description: string;
  difficulty: ChallengeDifficulty;
  progress: ChallengeProgress;
  starterCode: string;
  expectedVoxels: VoxelData[];
  // solution?: string; // Deprecated: use expectedVoxels for validation
  hint?: string;
  order?: number;
}
