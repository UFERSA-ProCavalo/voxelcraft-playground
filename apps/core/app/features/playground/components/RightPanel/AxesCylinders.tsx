import React from "react";

interface AxesCylindersProps {
  gridSize: number;
  tickInterval?: number;
  tickRadius?: number;
  min?: number;
  max?: number;
}

export function AxesCylinders({
  gridSize,
  tickInterval = 4,
  tickRadius = 0.18,
  min,
  max,
}: AxesCylindersProps) {
  // Calcula o alcance padrão se min/max não forem fornecidos
  const half = Math.floor(gridSize / 2 + 2);
  const axisMin = min !== undefined ? min : -half;
  const axisMax = max !== undefined ? max : half;
  const length = half + 0.5; // Estende até a borda da grade
  const radius = Math.max(0.01 * gridSize - 1, 0.05); // Espessura proporcional
  const cylArgs = [radius, radius, length, 16] as [
    number,
    number,
    number,
    number,
  ];
  const coneHeight = radius * 20;
  const coneRadius = radius * 10;
  const coneArgs = [coneRadius, coneHeight, 16] as [number, number, number];

  // Função auxiliar para renderizar esferas de marcação ao longo de um eixo
  function renderAxisTicks(axis: "x" | "y" | "z", color: string) {
    const ticks = [];
    // Renderiza apenas do zero até o lado positivo do eixo
    for (let v = tickInterval; v < axisMax; v += tickInterval) {
      let pos: [number, number, number] = [0, 0, 0];
      if (axis === "x") pos = [v, 0, 0];
      else if (axis === "y") pos = [0, v, 0];
      else if (axis === "z") pos = [0, 0, v];
      ticks.push(
        <mesh key={axis + v} position={pos}>
          <sphereGeometry args={[tickRadius, 16, 16]} />
          <meshStandardMaterial color={color} />
        </mesh>,
      );
    }
    return ticks;
  }

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
      {renderAxisTicks("x", "red")}
      {/* Eixo Y: verde */}
      <mesh position={[0, length / 2, 0]}>
        <cylinderGeometry args={cylArgs} />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh position={[0, length, 0]}>
        <coneGeometry args={coneArgs} />
        <meshStandardMaterial color="green" />
      </mesh>
      {renderAxisTicks("y", "green")}
      {/* Eixo Z: azul */}
      <mesh position={[0, 0, length / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={cylArgs} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[0, 0, length]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={coneArgs} />
        <meshStandardMaterial color="blue" />
      </mesh>
      {renderAxisTicks("z", "blue")}
    </group>
  );
}
