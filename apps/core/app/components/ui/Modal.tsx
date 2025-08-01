import React from "react";
import { useSoundStore } from "../../store/soundStore";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  const playSound = useSoundStore((s) => s.playSound);
  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current && !open) {
      // Modal acabou de ser fechado
      playSound("close");
    }
    prevOpen.current = open;
  }, [open, playSound]);

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClose}
          onContextMenu={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: 24,
              minWidth: 320,
              minHeight: 200,
              boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
