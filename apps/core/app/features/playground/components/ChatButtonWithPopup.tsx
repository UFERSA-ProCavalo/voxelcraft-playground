import { useState } from "react";
import { Button } from "~/components/ui/button";

export function ChatButtonWithPopup() {
  const [open, setOpen] = useState(false);

  // Tamanho do botão
  const buttonSize = 56;
  // Tamanho do chat
  const chatWidth = buttonSize;
  const chatHeight = buttonSize * 4;
  // Posição do botão
  const left = 72;
  const bottom = 32;

  return (
    <>
      {!open && (
        <div
          style={{
            position: "fixed",
            left,
            bottom,
            zIndex: 20,
            width: buttonSize,
            height: buttonSize,
            transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
          }}
        >
          <Button
            size="icon"
            variant="default"
            style={{ width: buttonSize, height: buttonSize, borderRadius: 999 }}
            onClick={() => setOpen(true)}
            title="Abrir chat IA"
            aria-label="Abrir chat IA"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </Button>
        </div>
      )}
      {open && (
        <div
          style={{
            position: "fixed",
            left,
            bottom,
            width: chatWidth,
            height: chatHeight,
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            borderRadius: 18,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: buttonSize,
              minHeight: buttonSize,
              background: "#f6f6f6",
              borderBottom: "1px solid #eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontWeight: 600,
              fontSize: 16,
              padding: "0 8px 0 16px",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Chat IA
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpen(false)}
              title="Fechar"
              aria-label="Fechar"
            >
              <svg
                width="18"
                height="18"
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
            </Button>
          </div>
          <div
            style={{
              flex: 1,
              padding: 12,
              color: "#888",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            <span>
              Em breve: chat com IA para ajudar nos desafios e no modo livre!
            </span>
          </div>
        </div>
      )}
    </>
  );
}
