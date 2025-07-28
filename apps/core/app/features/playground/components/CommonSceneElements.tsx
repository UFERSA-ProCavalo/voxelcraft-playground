import React from "react";
import { AxesCylinders } from "./RightPanel/AxesCylinders";
import { GridOutline } from "./RightPanel/GridOutline";
import { AxisRulers } from "./AxisRulers";
import { usePlaygroundStore } from "../lib/store";

interface CommonSceneElementsProps {
  gridSize: number;
  bounds: number;
  spacing: number;
  step?: number;
  children?: React.ReactNode;
}

/**
 * Shared scene elements: lights, axes, grid outline.
 * Use as a child of <Canvas> in both Scene and VoxelPreviewScene.
 */
export function CommonSceneElements({
  gridSize,
  bounds,
  spacing,
  step = 5,
  children,
}: CommonSceneElementsProps) {
  // Usa o store para controlar a visibilidade dos elementos
  const showAxes = usePlaygroundStore((s) => s.showAxes);
  const showOutline = usePlaygroundStore((s) => s.showOutline);
  const showRulers = usePlaygroundStore((s) => s.showRulers);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={0.8} />
      <directionalLight position={[-5, -10, -7]} intensity={0.8} />
      {/* Debug: strong point light at origin */}
      <pointLight position={[0, 0, 0]} intensity={2} />
      {children}
      {showAxes && <AxesCylinders gridSize={gridSize} tickInterval={step} />}
      {showOutline && (
        <GridOutline gridSize={gridSize} bounds={bounds} spacing={spacing} />
      )}
      {showRulers && (
        <AxisRulers
          min={(-bounds * gridSize) / 2}
          max={(bounds * gridSize) / 2}
          step={step}
        />
      )}
    </>
  );
}
