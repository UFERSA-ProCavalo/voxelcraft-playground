// Constantes globais para o playground de voxels

/**
 * Mapeamento de índices para cores de voxel.
 */

/**
 * Direções das faces de um voxel: +X, -X, +Y, -Y, +Z, -Z
 */
export const faceDirs = [
  [1, 0, 0], // Direita
  [-1, 0, 0], // Esquerda
  [0, 1, 0], // Cima
  [0, -1, 0], // Baixo
  [0, 0, 1], // Frente
  [0, 0, -1], // Trás
] as const;

/**
 * Offsets dos vértices de cada face para mesh customizada (FaceCulling)
 */
export const faceVertexOffsets = [
  // +X
  [
    [0.5, -0.5, -0.5],
    [0.5, 0.5, -0.5],
    [0.5, 0.5, 0.5],
    [0.5, -0.5, 0.5],
  ],
  // -X
  [
    [-0.5, -0.5, 0.5],
    [-0.5, 0.5, 0.5],
    [-0.5, 0.5, -0.5],
    [-0.5, -0.5, -0.5],
  ],
  // +Y
  [
    [-0.5, 0.5, 0.5],
    [0.5, 0.5, 0.5],
    [0.5, 0.5, -0.5],
    [-0.5, 0.5, -0.5],
  ],
  // -Y
  [
    [-0.5, -0.5, -0.5],
    [0.5, -0.5, -0.5],
    [0.5, -0.5, 0.5],
    [-0.5, -0.5, 0.5],
  ],
  // +Z
  [
    [0.5, -0.5, 0.5],
    [0.5, 0.5, 0.5],
    [-0.5, 0.5, 0.5],
    [-0.5, -0.5, 0.5],
  ],
  // -Z
  [
    [-0.5, -0.5, -0.5],
    [-0.5, 0.5, -0.5],
    [0.5, 0.5, -0.5],
    [0.5, -0.5, -0.5],
  ],
] as const;
