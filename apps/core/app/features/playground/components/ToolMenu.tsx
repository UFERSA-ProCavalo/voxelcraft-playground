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
}: ToolMenuProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 16,
        ...style,
      }}
    >
      <Card className={cardClassName || "tool-menu-card"}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
          }}
        >
          <Button
            variant={showAxes ? "default" : "outline"}
            size="icon"
            onClick={() => setShowAxes(!showAxes)}
            title="Alternar eixos"
            aria-label="Alternar eixos"
            style={{ marginRight: 8 }}
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
      </Card>{" "}
    </div>
  );
}
