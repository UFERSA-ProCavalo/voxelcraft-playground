import React, { useEffect, useRef, useState } from "react";

// Passos do onboarding
export type OnboardingStep =
  | "welcome"
  | "spotlight-challenges"
  | "spotlight-tutorial"
  | "spotlight-challenge-1"
  | "spotlight-start"
  | "spotlight-description"
  | "modal-challenges"
  | "done";

const ONBOARDING_KEY = "onboarding_complete_v1";

interface OnboardingGuideProps {
  onFinish?: () => void;
}

export const OnboardingGuide: React.FC<OnboardingGuideProps> = ({
  onFinish,
}) => {
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [show, setShow] = useState(false);

  // Checa se já completou onboarding
  useEffect(() => {
    if (typeof window !== "undefined") {
      const done = localStorage.getItem(ONBOARDING_KEY);
      if (!done) setShow(true);
    }
  }, []);

  // Avança para o próximo passo
  const next = () => {
    setStep((prev) => {
      switch (prev) {
        case "welcome":
          return "spotlight-challenges";
        case "spotlight-challenges":
          return "spotlight-tutorial";
        case "spotlight-tutorial":
          return "spotlight-challenge-1";
        case "spotlight-challenge-1":
          return "spotlight-start";
        case "spotlight-start":
          return "spotlight-description";
        case "spotlight-description":
          return "modal-challenges";
        case "modal-challenges":
          return "done";
        default:
          return "done";
      }
    });
  };

  // Finaliza onboarding
  useEffect(() => {
    if (step === "done" && show) {
      localStorage.setItem(ONBOARDING_KEY, "1");
      setShow(false);
      if (onFinish) onFinish();
    }
  }, [step, show, onFinish]);

  // Spotlight: calcula posição do elemento alvo
  const getTargetSelector = () => {
    switch (step) {
      case "spotlight-challenges":
        return '[data-onboarding="challenges-btn"]';
      case "spotlight-tutorial":
        return '[data-onboarding="tutorial-btn"]';
      case "spotlight-challenge-1":
        return '[data-onboarding="challenge-1-btn"]';
      case "spotlight-start":
        return '[data-onboarding="start-btn"]';
      case "spotlight-description":
        return '[data-onboarding="challenge-desc"]';
      default:
        return null;
    }
  };

  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const selector = getTargetSelector();
    if (!selector) {
      setSpotlightRect(null);
      return;
    }
    const el = document.querySelector(selector) as HTMLElement | null;
    if (el) {
      const rect = el.getBoundingClientRect();
      setSpotlightRect(rect);

      // Add visual cue (animated border)
      el.classList.add("onboarding-spotlight-active");

      // Focus for accessibility
      el.focus && el.focus();

      // Handler for click/keyboard
      const handle = (e: Event) => {
        // Only respond to left click or Enter/Space
        if (e instanceof MouseEvent && e.type === "click") {
          setTimeout(() => next(), 0);
        } else if (
          e instanceof KeyboardEvent &&
          (e.key === "Enter" || e.key === " ")
        ) {
          setTimeout(() => next(), 0);
        }
      };
      el.addEventListener("click", handle, { once: true });
      el.addEventListener("keydown", handle, { once: true });

      // Ensure pointer events enabled on target
      el.style.pointerEvents = "auto";

      return () => {
        el.classList.remove("onboarding-spotlight-active");
        el.removeEventListener("click", handle);
        el.removeEventListener("keydown", handle);
        el.style.pointerEvents = "";
      };
    } else {
      setSpotlightRect(null);
    }
  }, [step]);
  if (!show) return null;

  // Overlay/Spotlight
  const Overlay = () => {
    if (!spotlightRect) return null;
    // Usa CSS fixed + clip-path para "buraco" no overlay
    const { top, left, width, height } = spotlightRect;
    const padding = 8;
    const r = 8;
    const style: React.CSSProperties = {
      position: "fixed",
      zIndex: 10000,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.6)",
      pointerEvents: "auto",
      // Buraco arredondado
      clipPath: `polygon(
        0 0, 100vw 0, 100vw 100vh, 0 100vh,
        0 0,
        ${left - padding}px ${top - padding}px,
        ${left + width + padding}px ${top - padding}px,
        ${left + width + padding}px ${top + height + padding}px,
        ${left - padding}px ${top + height + padding}px,
        ${left - padding}px ${top - padding}px
      )`,
      transition: "clip-path 0.2s",
    };
    return <div style={style} />;
  };

  // Modal genérico
  const Modal: React.FC<{
    children: React.ReactNode;
    onNext?: () => void;
    okText?: string;
  }> = ({ children, onNext, okText }) => (
    <div
      style={{
        position: "fixed",
        zIndex: 10001,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 32,
          maxWidth: 400,
          boxShadow: "0 8px 32px #0002",
        }}
      >
        {children}
        {onNext && (
          <button style={{ marginTop: 24 }} onClick={onNext}>
            {okText || "Próximo"}
          </button>
        )}
      </div>
    </div>
  );

  // Renderização dos passos
  switch (step) {
    case "welcome":
      return (
        <Modal onNext={next} okText="Começar">
          <h2>Bem-vindo ao Voxelcraft Playground!</h2>
          <p>
            Este projeto é um ambiente interativo para aprender lógica e
            programação com voxels.
          </p>
          <p>Vamos te mostrar como funciona!</p>
        </Modal>
      );
    case "spotlight-challenges":
    case "spotlight-tutorial":
    case "spotlight-challenge-1":
    case "spotlight-start":
    case "spotlight-description":
      return (
        <>
          <Overlay />
          {/* Dica/tooltip */}
          <div
            style={{
              position: "fixed",
              zIndex: 10002,
              top:
                (spotlightRect?.top ?? 0) + (spotlightRect?.height ?? 0) + 16,
              left: spotlightRect?.left ?? 0,
              background: "#fff",
              borderRadius: 8,
              padding: 16,
              boxShadow: "0 2px 8px #0002",
              maxWidth: 320,
            }}
          >
            {step === "spotlight-challenges" && (
              <span>
                Clique <b>no botão destacado</b> para avançar!
              </span>
            )}
            {step === "spotlight-tutorial" && (
              <span>
                Clique <b>no botão destacado</b> para avançar!
              </span>
            )}
            {step === "spotlight-challenge-1" && (
              <span>
                Clique <b>no botão destacado</b> para avançar!
              </span>
            )}
            {step === "spotlight-start" && (
              <span>
                Clique <b>no botão destacado</b> para avançar!
              </span>
            )}
            {step === "spotlight-description" && (
              <span>
                Leia a descrição e clique em <b>OK</b> para continuar.
              </span>
            )}
            {step === "spotlight-description" && (
              <div style={{ marginTop: 12 }}>
                <button onClick={next}>OK</button>
              </div>
            )}
          </div>{" "}
        </>
      );
    case "modal-challenges":
      return (
        <Modal onNext={next} okText="Entendi">
          <h2>Sobre os desafios</h2>
          <p>
            Cada desafio propõe uma tarefa de lógica ou programação. Complete
            para desbloquear o próximo!
          </p>
        </Modal>
      );
    default:
      return null;
  }
};
