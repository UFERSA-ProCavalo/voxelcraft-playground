import React from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three-stdlib";

interface GridOutlineProps {
  gridSize: number;
  bounds: number;
  spacing: number;
}

export function GridOutline({ gridSize, bounds, spacing }: GridOutlineProps) {
  // Cria uma grade de linhas ao redor do grid
  const size = gridSize * spacing + 1.15; // Tamanho total da grade
  const geometry = new RoundedBoxGeometry(
    size,
    size,
    size,
    4,
    0.1,
  ) as THREE.BufferGeometry;
  return (
    <lineSegments>
      <edgesGeometry args={[geometry as any]} />
      <lineBasicMaterial color="black" linewidth={1} />
    </lineSegments>
  );
}
