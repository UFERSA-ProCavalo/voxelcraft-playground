import React from "react";

interface AxesCylindersProps {
  gridSize: number;
}

export function AxesCylinders({ gridSize }: AxesCylindersProps) {
  const half = Math.floor(gridSize / 2 + 2);
  const length = half + 0.5; // Estende até a borda da grade
  const radius = Math.max(0.01 * gridSize, 0.05); // Espessura proporcional
  const cylArgs = [radius, radius, length, 16] as [
    number,
    number,
    number,
    number,
  ];
  const coneHeight = radius * 10;
  const coneRadius = radius * 3;
  const coneArgs = [coneRadius, coneHeight, 16] as [number, number, number];
  return (
    <group>
      {/* Eixo X: vermelho */}
      <mesh position={[length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={cylArgs} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[length, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={coneArgs} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Eixo Y: verde */}
      <mesh position={[0, length / 2, 0]}>
        <cylinderGeometry args={cylArgs} />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh position={[0, length, 0]}>
        <coneGeometry args={coneArgs} />
        <meshStandardMaterial color="green" />
      </mesh>
      {/* Eixo Z: azul */}
      <mesh position={[0, 0, length / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={cylArgs} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[0, 0, length]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={coneArgs} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
}
