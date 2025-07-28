import { Line, Text } from "@react-three/drei";

interface AxisRulersProps {
  min?: number;
  max?: number;
  step?: number;
  offset?: number;
  color?: string; // cor padrão (fallback)
  axisColors?: {
    x?: string;
    y?: string;
    z?: string;
  };
}

/**
 * AxisRulers renderiza réguas com marcas e rótulos para os eixos X, Y e Z.
 * Intervalo padrão: -15 a 15, passo 5, deslocamento 1.2 unidades da origem.
 */
export function AxisRulers({
  min = -15,
  max = 15,
  step = 5,
  offset = 1.2,
  color = "#888",
  axisColors = {},
}: AxisRulersProps) {
  // Cores padrão dos eixos: X = vermelho, Y = verde, Z = azul
  const defaultAxisColors = { x: "#f00", y: "#0f0", z: "#00f" };
  const mergedAxisColors = { ...defaultAxisColors, ...axisColors };

  // Função auxiliar para gerar marcas e rótulos para um eixo
  function renderAxis(axis: "x" | "y" | "z") {
    const ticks = [];
    for (let v = min; v <= max; v += step) {
      let pos: [number, number, number] = [0, 0, 0];
      let tickDir: [number, number, number] = [0, 0, 0];
      let labelPos: [number, number, number] = [0, 0, 0];
      if (axis === "x") {
        // Eixo X: ao longo da borda +z, y=0
        pos = [v, min - offset / 2, max + offset];
        tickDir = [0, 0.3, 0]; // marca para cima em y
        labelPos = [v, min - offset, max + offset];
      } else if (axis === "y") {
        // Eixo Y: ao longo da borda +z, x=min-offset
        pos = [max + offset + offset / 2, v, min - offset];
        tickDir = [-0.3, 0, 0]; // marca para a esquerda em x
        labelPos = [max + 2 * offset, v, min - offset];
      } else if (axis === "z") {
        // Eixo Z: ao longo da borda +x, y=0
        pos = [max + offset, min - offset / 2, v];
        tickDir = [0, 0.3, 0]; // marca para cima em y
        labelPos = [max + offset, min - offset, v];
      }
      ticks.push(
        <group key={axis + v}>
          {/* Marca de régua */}
          <Line
            points={[
              pos,
              [pos[0] + tickDir[0], pos[1] + tickDir[1], pos[2] + tickDir[2]],
            ]}
            color={mergedAxisColors[axis] || color}
            lineWidth={2}
          />
          {/* Rótulo */}
          <Text
            position={labelPos}
            fontSize={1}
            color={mergedAxisColors[axis] || color}
            anchorX="center"
            anchorY="middle"
            outlineColor="#fff"
            outlineWidth={0.02}
          >
            {v}
          </Text>
        </group>,
      );
    }
    // Linha principal do eixo
    let axisStart: [number, number, number], axisEnd: [number, number, number];
    if (axis === "x") {
      // X axis: along +z edge, y=0
      axisStart = [min, min, max + offset];
      axisEnd = [max, min, max + offset];
    } else if (axis === "y") {
      // Y axis: along +z edge, x=min-offset
      axisStart = [max + offset, min, min - offset];
      axisEnd = [max + offset, max, min - offset];
    } else {
      // Z axis: along +x edge, y=0
      axisStart = [max + offset, min, min];
      axisEnd = [max + offset, min, max];
    }
    return (
      <group key={axis}>
        <Line points={[axisStart, axisEnd]} color={mergedAxisColors[axis] || color} lineWidth={2} />
        {ticks}
      </group>
    );
  }
  return (
    <group>
      {renderAxis("x")}
      {renderAxis("y")}
      {renderAxis("z")}
    </group>
  );
}
