import { Progress } from "~/components/ui/progress";

interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

/**
 * Barra de progresso para similaridade de desafio, usando shadcn/ui Progress.
 * Lógica e visual herdados do antigo playground-page.
 */
export function ProgressBar({
  value,
  label = "Progresso",
  className = "",
}: ProgressBarProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: 24,
        top: "50vh",
        zIndex: 30,
        width: 180,
        background: "rgba(255,255,255,0.9)",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className={className}
    >
      <span style={{ fontSize: 13, color: "#444", marginBottom: 4 }}>
        {label}
      </span>
      <Progress value={value} className="w-full" />
      <span style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
        {value}%
      </span>
    </div>
  );
}
