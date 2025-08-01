import * as React from "react";
import { Card } from "~/components/ui/card";
import { usePlaygroundStore } from "~/store/store";

/**
 * ColorTool: mostra referência das cores da paleta do store
 * Inspirado no ToolMenu visual
 */
export function ColorTool({ style, cardClassName }: { style?: React.CSSProperties; cardClassName?: string }) {
  const colorMap = usePlaygroundStore((s) => s.colorMap);
  return (
    <div
      style={{
        position: "absolute",
        left: 24, // alinhado ao ToolMenu
        top: "calc(60vh + 80px)", // logo abaixo do ToolMenu, ajuste conforme necessário
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8,
        background: "rgba(255,255,255,0.85)",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        padding: 8,
        ...style,
      }}
    >
      <Card className={cardClassName} style={{ padding: 12, minWidth: 180 }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Referência de Cores</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {Object.entries(colorMap).map(([idx, color]) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                background: "#f6f6f6",
                borderRadius: 6,
                padding: 8,
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: color,
                  border: "1px solid #ddd",
                  marginBottom: 2,
                }}
              />
              <div style={{ fontSize: 13, color: "#888" }}>#{idx}</div>
              <div style={{ fontSize: 13, color: color }}>{color}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
