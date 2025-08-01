import React from "react";
import { AxesCylinders } from "./RightPanel/AxesCylinders";
import { GridOutline } from "./RightPanel/GridOutline";
import { AxisRulers } from "./AxisRulers";
import { usePlaygroundStore } from "../../../store/store";

interface CommonSceneElementsProps {
  gridSize: number;
  bounds: number;
  spacing: number;
  step?: number;
  children?: React.ReactNode;
}

/**
 * Elementos de cena compartilhados: luzes, eixos, contorno da grade.
 * Use como filho de <Canvas> tanto em Scene quanto em VoxelPreviewScene.
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
      {/* Debug: luz pontual forte na origem */}
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
