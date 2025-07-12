// Tipos para o playground de voxels
// Comentários em português brasileiro, padrão JSDoc

/**
 * Representa um voxel na cena.
 * @property {number, number, number} position - Posição do voxel [x, y, z]
 * @property {number, number, number} size - Tamanho do voxel [largura, altura, profundidade]. Padrão: [1, 1, 1]
 * @property {string} color - Cor do voxel (opcional)
 */
export interface VoxelData {
  position: [number, number, number];
  size?: [number, number, number];
  color?: string;
}
