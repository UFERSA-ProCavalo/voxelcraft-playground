import React from "react";

interface AxesCylindersProps {
  gridSize: number;
}

export function AxesCylinders({ gridSize }: AxesCylindersProps) {
  const half = Math.floor(gridSize / 2 + 2);
  const length = half + 0.5; // Extends to the edge of the grid
  const radius = Math.max(0.03 * gridSize, 0.05); // Proportional thickness
  const cylArgs = [radius, radius, length, 16] as [
    number,
    number,
    number,
    number,
  ];
  const coneHeight = radius * 4;
  const coneRadius = radius * 2;
  const coneArgs = [coneRadius, coneHeight, 16] as [number, number, number];
  return (
    <group>
      {/* X axis: red */}
      <mesh position={[length / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={cylArgs} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[length, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={coneArgs} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Y axis: green */}
      <mesh position={[0, length / 2, 0]}>
        <cylinderGeometry args={cylArgs} />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh position={[0, length, 0]}>
        <coneGeometry args={coneArgs} />
        <meshStandardMaterial color="green" />
      </mesh>
      {/* Z axis: blue */}
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
