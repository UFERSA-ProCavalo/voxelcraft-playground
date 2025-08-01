import * as React from "react";
import { Save, Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { useSoundStore } from "~/store/soundStore";
import { exportVoxelsToObjMtl } from "../utils-export-obj";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/DropdownMenu";
import { Modal } from "~/components/ui/Modal";

/**
 * ToolMenu compartilhado para alternar eixos e grade.
 * Pode ser usado tanto no painel principal quanto no popup.
 */
import type { VoxelData } from "../types";

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
  // Props para salvar/recuperar código no modo Livre
  code?: string;
  setCode?: (code: string) => void;
  // Voxels da cena atual para exportação
  voxels?: VoxelData[];
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
  code,
  setCode,
  voxels,
}: ToolMenuProps) {
  const [showExportError, setShowExportError] = React.useState(false);
  const [showExportCodeError, setShowExportCodeError] = React.useState(false);
  // DropdownMenu de salvar/load slots 3x3
  const SaveLoadDropdown = ({
    code,
    setCode,
  }: {
    code: string;
    setCode: (code: string) => void;
  }) => {
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [pendingSlot, setPendingSlot] = React.useState<number | null>(null);
    const [pendingAction, setPendingAction] = React.useState<"save" | null>(
      null,
    );
    const [slots, setSlots] = React.useState<(string | null)[]>(() => {
      return Array.from({ length: 9 }, (_, i) => {
        try {
          return localStorage.getItem(`free_code_slot_${i + 1}`);
        } catch {
          return null;
        }
      });
    });

    // Atualiza slots ao salvar/carregar
    const refreshSlots = () => {
      setSlots(
        Array.from({ length: 9 }, (_, i) => {
          try {
            return localStorage.getItem(`free_code_slot_${i + 1}`);
          } catch {
            return null;
          }
        }),
      );
    };

    // Salvar código no slot
    const saveSlot = (idx: number) => {
      localStorage.setItem(`free_code_slot_${idx + 1}`, code);
      refreshSlots();
    };

    // Carregar código do slot
    const loadSlot = (idx: number) => {
      const val = localStorage.getItem(`free_code_slot_${idx + 1}`);
      if (val) setCode(val);
    };

    // Handler de click
    const handleSlotClick = (idx: number, e: React.MouseEvent) => {
      e.preventDefault();
      if (e.type === "click" && e.button === 0) {
        // Esquerdo: save
        if (slots[idx]) {
          setPendingSlot(idx);
          setPendingAction("save");
          setDropdownOpen(false); // Fecha o DropdownMenu
          setModalOpen(true);
        } else {
          saveSlot(idx);
        }
      } else if (e.type === "contextmenu" || e.button === 2) {
        // Direito: load
        loadSlot(idx);
      }
    };

    // Confirma sobrescrever
    const confirmOverwrite = () => {
      if (pendingSlot !== null && pendingAction === "save") {
        saveSlot(pendingSlot);
      }
      setModalOpen(false);
      setPendingSlot(null);
      setPendingAction(null);
    };

    // Lucide Save icon
    const diskIcon = <Save size={20} />;
    const playSound = useSoundStore((s) => s.playSound);
    return (
      <>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              onPointerDown={() => playSound("click")}
              variant="outline"
              size="icon"
              title="Salvar/Carregar slots"
              aria-label="Salvar/Carregar slots"
            >
              {diskIcon}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={8} style={{ padding: 12 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 32px)",
                gap: 8,
              }}
            >
              {Array.from({ length: 9 }, (_, i) => (
                <button
                  key={i}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    background: slots[i] ? "#e0ffe0" : "#f8f8f8",
                    cursor: "pointer",
                    position: "relative",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                  onClick={(e) => handleSlotClick(i, e as any)}
                  onContextMenu={(e) => handleSlotClick(i, e as any)}
                  title={slots[i] ? "Slot salvo" : "Slot vazio"}
                >
                  {i + 1}
                  {slots[i] && (
                    <span
                      style={{
                        position: "absolute",
                        top: 2,
                        right: 4,
                        fontSize: 10,
                        color: "#0a0",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Check size={12} />
                    </span>
                  )}{" "}
                </button>
              ))}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#888",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              Clique esquerdo: salvar
              <br />
              Clique direito: carregar
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: 16 }}>
              Já existe um código salvo neste slot.
              <br />
              Deseja sobrescrever?
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
              <Button
                variant="destructive"
                onClick={confirmOverwrite}
                suppressClickSound
              >
                Sobrescrever
              </Button>
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "60vh",
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

        {/* Botão de salvar/load para modo Livre */}
        {code !== undefined && setCode && (
          <SaveLoadDropdown code={code} setCode={setCode} />
        )}
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

        {/* Dropdown de exportação */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              title="Exportar"
              aria-label="Exportar"
            >
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
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuItem
              onClick={() => {
                if (!voxels || voxels.length === 0) {
                  setShowExportError(true);
                  return;
                }
                const { obj } = exportVoxelsToObjMtl(voxels, { cubeSize: 1 });
                const blob = new Blob([obj], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "voxels.obj";
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }, 100);
              }}
            >
              Exportar OBJ
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (!voxels || voxels.length === 0) {
                  setShowExportError(true);
                  return;
                }
                const { mtl } = exportVoxelsToObjMtl(voxels, { cubeSize: 1 });
                const blob = new Blob([mtl], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "voxels.mtl";
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }, 100);
              }}
            >
              Exportar MTL
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                if (!code || !voxels || voxels.length === 0) {
                  setShowExportCodeError(true);
                  return;
                }
                const blob = new Blob([code], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "usercode.txt";
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }, 100);
              }}
            >
              Exportar usercode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Modal open={showExportError} onClose={() => setShowExportError(false)}>
          <div style={{ textAlign: "center", padding: 16 }}>
            <div style={{ marginBottom: 16 }}>
              Não há objeto para exportar.
              <br />
              Crie ou adicione voxels antes de exportar.
            </div>
            <Button variant="outline" onClick={() => setShowExportError(false)}>
              OK
            </Button>
          </div>
        </Modal>
        <Modal
          open={showExportCodeError}
          onClose={() => setShowExportCodeError(false)}
        >
          <div style={{ textAlign: "center", padding: 16 }}>
            <div style={{ marginBottom: 16 }}>
              O código não gera nenhum objeto.
              <br />
              Escreva algum código válido antes de exportar.
            </div>
            <Button
              variant="outline"
              onClick={() => setShowExportCodeError(false)}
            >
              OK
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
