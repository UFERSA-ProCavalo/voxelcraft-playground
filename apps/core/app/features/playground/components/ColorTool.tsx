import * as React from "react";
import { Card } from "~/components/ui/card";
import { usePlaygroundStore } from "~/store/store";

/**
 * ColorTool: mostra referência das cores da paleta do store
 * Inspirado no ToolMenu visual
 */
export function ColorTool({
  style,
  cardClassName,
}: {
  style?: React.CSSProperties;
  cardClassName?: string;
}) {
  const colorMap = usePlaygroundStore((s) => s.colorMap);
  return (
    <div
      style={{
        position: "absolute",
        left: 24,
        top: "86vh",
        zIndex: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 8,
        background: "rgba(255,255,255,0.85)",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        padding: 6,
        ...style,
      }}
    >
      {Object.entries(colorMap).map(([idx, color]) => (
        <div
          key={idx}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            minWidth: 32,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 4,
              background: color,
              border: "1px solid #ccc",
              marginBottom: 2,
            }}
          />
          <div style={{ fontSize: 11, color: "#888" }}>#{idx}</div>
        </div>
      ))}
    </div>
  );
}
