import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

/**
 * ToolMenu compartilhado para alternar eixos e grade.
 * Pode ser usado tanto no painel principal quanto no popup.
 * Comentários em pt-BR conforme padrão do projeto.
 */
export interface ToolMenuProps {
  showAxes: boolean;
  setShowAxes: (v: boolean) => void;
  showOutline: boolean;
  setShowOutline: (v: boolean) => void;
  showRulers?: boolean;
  setShowRulers?: (v: boolean) => void;
  style?: React.CSSProperties;
  cardClassName?: string;
  // Botão Run opcional
  onRun?: () => void;
  runDisabled?: boolean;
}

export function ToolMenu({
  showAxes,
  setShowAxes,
  showOutline,
  setShowOutline,
  showRulers,
  setShowRulers,
  style,
  cardClassName,
  onRun,
  runDisabled,
}: ToolMenuProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        left: 24,
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <Button
          variant={showAxes ? "default" : "outline"}
          size="icon"
          onClick={() => setShowAxes(!showAxes)}
          title="Alternar eixos"
          aria-label="Alternar eixos"
        >
          {/* Lucide Axis3D icon fallback SVG */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v20M2 12h20" />
          </svg>
        </Button>
        {onRun && (
          <Button
            variant="outline"
            size="icon"
            onClick={onRun}
            title="Executar comparação"
            aria-label="Executar comparação"
            disabled={runDisabled}
            style={{ opacity: runDisabled ? 0.5 : 1 }}
          >
            {/* Lucide Play icon fallback SVG */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </Button>
        )}
        <Button
          variant={showOutline ? "default" : "outline"}
          size="icon"
          onClick={() => setShowOutline(!showOutline)}
          title="Alternar grade"
          aria-label="Alternar grade"
        >
          {/* Lucide Grid icon fallback SVG */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
          </svg>
        </Button>
        {typeof showRulers === "boolean" && setShowRulers && (
          <Button
            variant={showRulers ? "default" : "outline"}
            size="icon"
            onClick={() => setShowRulers(!showRulers)}
            title="Alternar réguas"
            aria-label="Alternar réguas"
          >
            {/* Ruler icon SVG */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="6" rx="2" />
              <path d="M6 7v6M10 7v6M14 7v6M18 7v6" />
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
}
