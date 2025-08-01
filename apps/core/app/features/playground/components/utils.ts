// Estilo do container externo do lado esquerdo (envolve o editor)
export const CONTAINER_LADO_ESQUERDO = (widthPercent: number) => ({
  flexBasis: `${widthPercent}%`,
  minWidth: 0,
  display: "flex",
  flexDirection: "column" as const,
  borderRight: "1px solid #eee",
});

// Estilo do container externo do lado direito (envolve as cenas)
export const CONTAINER_LADO_DIREITO = {
  flex: 1,
  minWidth: 0,
  margin: "0 0 24px 0", // margem inferior igual para ambos os modos
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "stretch" as const,
};

// Tema visual padrão para containers de cena
export const TEMA_CENA = {
  flex: 1,
  minHeight: 0,
  background: "var(--color-card, #fafbfc)",
  border: "1.5px solid var(--color-border, #e5e7eb)",
  borderRadius: "var(--radius-lg, 0.4rem)",
  overflow: "hidden",
};

// Utility for mapping voxel positions with spacing and bounds
import type { VoxelData } from "../types";

/**
 * Mapeia as posições dos voxels usando o espaçamento fornecido.
 * @param voxels Array de VoxelData
 * @param spacing número
 * @returns Array de VoxelData com posições mapeadas
 */
export function mapVoxelPositions(
  voxels: VoxelData[],
  spacing: number,
): VoxelData[] {
  return voxels.map((v) => ({
    ...v,
    position: [
      v.position[0] * spacing,
      v.position[1] * spacing,
      v.position[2] * spacing,
    ],
  }));
}
