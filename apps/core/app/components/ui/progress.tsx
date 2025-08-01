import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "~/lib/utils";
import { useSoundStore } from "~/store/soundStore";

import { useEffect, useState } from "react";

export function Progress({
  className,
  value,
  challengeId,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  challengeId?: string;
}) {
  const safeValue = typeof value === "number" && !isNaN(value) ? value : 0;
  const [showCongrats, setShowCongrats] = React.useState(false);
  const [alreadySeen, setAlreadySeen] = React.useState(false);
  const prevValue = React.useRef(safeValue);
  const playSound = useSoundStore((s) => s.playSound);

  // Check seen flag on mount and when challengeId changes
  React.useEffect(() => {
    if (!challengeId) return;
    try {
      const saved = localStorage.getItem(`challenge-progress-${challengeId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.seen) setAlreadySeen(true);
        else setAlreadySeen(false);
      } else {
        setAlreadySeen(false);
      }
    } catch {
      setAlreadySeen(false);
    }
  }, [challengeId]);

  React.useEffect(() => {
    if (safeValue === 100 && prevValue.current < 100 && !alreadySeen) {
      setShowCongrats(true);
    }
    prevValue.current = safeValue;
  }, [safeValue, alreadySeen]);

  React.useEffect(() => {
    if (showCongrats) {
      playSound && playSound("success");
    }
  }, [showCongrats, playSound]);

  return (
    <>
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          safeValue === 100
            ? "bg-green-500 animate-success-pulse relative h-2 w-full overflow-hidden rounded-full"
            : "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
          className,
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            safeValue === 100
              ? "bg-green-500 animate-success-bar h-full w-full flex-1 transition-all"
              : safeValue >= 78
                ? "bg-green-500 h-full w-full flex-1 transition-all"
                : safeValue >= 30
                  ? "bg-yellow-400 h-full w-full flex-1 transition-all"
                  : "bg-red-500 h-full w-full flex-1 transition-all",
          )}
          style={{ transform: `translateX(-${100 - safeValue}%)` }}
        />
      </ProgressPrimitive.Root>
      {showCongrats && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.35)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowCongrats(false);
            if (challengeId) {
              import("~/features/playground/lib/persistence").then(
                ({ setChallengeSeen }) => {
                  setChallengeSeen(challengeId);
                },
              );
            }
          }}
        >
          {/* Confetti SVG effect */}
          <ConfettiEffect />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              background: "rgba(255,255,255,0.95)",
              borderRadius: 16,
              padding: "48px 64px",
              boxShadow: "0 8px 32px #0002",
              fontSize: 36,
              fontWeight: 700,
              color: "#16a34a",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Mandou bem!
          </div>
          <div style={{ color: "#555", fontSize: 16, marginTop: 8, zIndex: 2 }}>
            Clique para fechar
          </div>
        </div>
      )}
    </>
  );
}

// Confetti SVG effect (leve, animado)
function ConfettiEffect() {
  // Simples: vários círculos coloridos animados com CSS
  return (
    <svg
      width="100vw"
      height="100vh"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 1,
        width: "100vw",
        height: "100vh",
      }}
    >
      {[...Array(24)].map((_, i) => {
        const x = Math.random() * 100;
        const delay = Math.random() * 1.5;
        const color = [
          "#fbbf24", // yellow
          "#f87171", // red
          "#34d399", // green
          "#60a5fa", // blue
          "#a78bfa", // purple
          "#f472b6", // pink
        ][i % 6];
        return (
          <circle
            key={i}
            cx={`${x}vw`}
            cy="-10"
            r={Math.random() * 8 + 6}
            fill={color}
            style={{
              animation: `confetti-fall 1.2s ${delay}s cubic-bezier(.6,.2,.4,1) forwards`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confetti-fall {
          to {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0.7;
          }
        }
      `}</style>
    </svg>
  );
}
