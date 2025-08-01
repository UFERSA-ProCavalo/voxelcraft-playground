import React from "react";
import { usePlaygroundStore } from "~/store/store";

export const ColorPickerSettings: React.FC = () => {
  const colorMap = usePlaygroundStore((s) => s.colorMap);
  const setColorInMap = usePlaygroundStore((s) => s.setColorInMap);
  const userColor = usePlaygroundStore((s) => s.userColor);
  const setUserColor = usePlaygroundStore((s) => s.setUserColor);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Edite a paleta de cores:</div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {Object.entries(colorMap).map(([idx, color]) => (
          <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <button
              aria-label={`Escolher cor ${color}`}
              onClick={() => setUserColor(color)}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: userColor === color ? "3px solid #222" : "2px solid #ccc",
                background: color,
                outline: userColor === color ? "2px solid #2980b9" : "none",
                cursor: "pointer",
                boxShadow: userColor === color ? "0 0 0 2px #2980b9" : undefined,
                transition: "border 0.15s, outline 0.15s, box-shadow 0.15s",
                marginBottom: 2,
              }}
            />
            <input
              type="color"
              value={color}
              onChange={e => setColorInMap(Number(idx), e.target.value)}
              style={{ width: 32, height: 24, border: "none", background: "none", padding: 0, cursor: "pointer" }}
              aria-label={`Editar cor ${color}`}
            />
          </div>
        ))}
      </div>
      <div style={{ fontSize: 13, color: "#888", marginTop: 12 }}>
        Clique em um círculo para escolher sua cor de usuário.<br />
        Use o seletor abaixo de cada cor para editar a paleta.
      </div>
    </div>
  );
};
