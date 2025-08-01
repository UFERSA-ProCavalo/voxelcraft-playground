import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "~/components/ui/button";

/**
 * Componente de popup arrastável e redimensionável.
 * Permite exibir children em uma janela flutuante, com botão de fechar.
 * Comentários em pt-BR conforme padrão do projeto.
 */
// import { VoxelPreviewScene } from "./VoxelPreviewScene";
import { usePlaygroundStore } from "../../../store/store";

import { useChallengeVoxels } from "../lib/ChallengeVoxelsProvider";

export interface DraggablePopupProps {
  code: string;
  onClose: () => void;
  showAxes?: boolean;
  showOutline?: boolean;
  perfOffset?: number;
  challengeId?: string | null;
}

export function DraggablePopup({ onClose, challengeId }: DraggablePopupProps) {
  // Ref for reset camera in preview
  const resetCameraRef = useRef<(() => void) | null>(null);
  // Shared state for axes/grid toggles
  const showAxes = usePlaygroundStore((s) => s.showAxes);
  const showOutline = usePlaygroundStore((s) => s.showOutline);
  const { getVoxelsForChallenge } = useChallengeVoxels();
  const voxels = challengeId ? getVoxelsForChallenge(challengeId) : undefined;
  const popupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [position, setPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 420,
    height: 260,
  });

  // Centraliza o popup no container ao montar
  useEffect(() => {
    if (!position && containerRef.current && popupRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: containerRect.width / 2 - size.width / 2,
        y: containerRect.height / 2 - size.height / 2,
      });
    }
  }, [position, size.width, size.height]);

  // Lógica de arrastar
  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("resize-handle")) return;
    setDragging(true);
    const rect = popupRef.current?.getBoundingClientRect();
    setOffset({
      x: e.clientX - (rect?.left ?? 0),
      y: e.clientY - (rect?.top ?? 0),
    });
    e.preventDefault();
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging && containerRef.current && popupRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        let newX = e.clientX - containerRect.left - offset.x;
        let newY = e.clientY - containerRect.top - offset.y;
        // Limita aos limites do container
        newX = Math.max(0, Math.min(newX, containerRect.width - size.width));
        newY = Math.max(0, Math.min(newY, containerRect.height - size.height));
        setPosition({ x: newX, y: newY });
      } else if (resizing && containerRef.current && popupRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const popupRect = popupRef.current.getBoundingClientRect();
        let newWidth = e.clientX - popupRect.left;
        let newHeight = e.clientY - popupRect.top;
        // Restrições mínimas/máximas
        const minWidth = 280;
        const minHeight = 180;
        const maxWidth = containerRect.width - (position?.x ?? 0);
        const maxHeight = containerRect.height - (position?.y ?? 0);
        newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
        newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
        setSize({ width: newWidth, height: newHeight });
      }
    },
    [dragging, resizing, offset, size.width, size.height, position],
  );

  const onMouseUp = () => {
    setDragging(false);
    setResizing(false);
  };

  useEffect(() => {
    if (dragging || resizing) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [dragging, resizing, onMouseMove]);

  // Lógica do handle de resize
  const onResizeMouseDown = (e: React.MouseEvent) => {
    setResizing(true);
    e.stopPropagation();
    e.preventDefault();
  };

  // O container externo permite limitar o popup aos limites do painel
  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // permite interação com o fundo
        zIndex: 10,
      }}
    >
      <div
        ref={popupRef}
        style={{
          position: "absolute",
          top: position ? position.y : "40%",
          left: position ? position.x : "30%",
          width: size.width,
          height: size.height,
          minWidth: 280,
          minHeight: 180,
          background: "#f9f9f9",
          border: "2px solid #b3b3b3",
          borderRadius: 8,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          cursor: dragging ? "move" : "default",
          userSelect: dragging ? "none" : "auto",
          pointerEvents: "auto", // permite interação com o popup
        }}
      >
        {/* Barra de título */}
        <div
          style={{
            background: "linear-gradient(90deg, #e0e0e0 0%, #f8f8f8 100%)",
            padding: "8px 16px",
            borderBottom: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: 600,
            fontSize: 16,
            cursor: "move",
          }}
          onMouseDown={onMouseDown}
        >
          Pré-visualização do desafio
          <Button
            size="icon"
            variant="outline"
            onClick={onClose}
            title="Fechar"
            aria-label="Fechar"
          >
            {/* X (close) icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </Button>{" "}
        </div>
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {challengeId ? (
            voxels && voxels.length > 0 ? (
              <>{/* Preview scene removed */}</>
            ) : (
              <div style={{ padding: 24, textAlign: "center", color: "#888" }}>
                Nenhum voxel para este desafio.
              </div>
            )
          ) : (
            <div style={{ padding: 24, textAlign: "center", color: "#888" }}>
              Nenhum desafio selecionado.
            </div>
          )}{" "}
          {/* Handle de resize */}
          <div
            className="resize-handle"
            onMouseDown={onResizeMouseDown}
            style={{
              position: "absolute",
              width: 18,
              height: 18,
              right: 2,
              bottom: 2,
              cursor: "nwse-resize",
              background: "rgba(180,180,180,0.18)",
              borderRadius: 4,
              zIndex: 2,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
            title="Redimensionar"
            aria-label="Redimensionar"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="#888"
              strokeWidth="2"
            >
              <path d="M2 12L12 2" />
              <path d="M7 12L12 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
