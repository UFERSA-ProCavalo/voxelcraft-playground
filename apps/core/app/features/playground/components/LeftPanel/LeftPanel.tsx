import { useState, useEffect, useRef } from "react"; // useState já importado aqui

// Debug helper: window.debug_unlock_all(true) to unlock all challenges, window.debug_unlock_all(false) to restore normal progression
if (typeof window !== "undefined") {
  (window as any).debug_unlock_all = (on: boolean) => {
    if (on) {
      localStorage.setItem("UNLOCK_ALL_CHALLENGES", "1");
    } else {
      localStorage.removeItem("UNLOCK_ALL_CHALLENGES");
    }
    location.reload();
  };
}

import {
  Save,
  Download,
  Play,
  Code,
  List,
  CircleQuestionMark,
  Settings,
  Volume,
  VolumeX,
  Lock,
  Volume1,
  Volume2,
  Keyboard,
} from "lucide-react";
import { CodeEditor } from "./CodeEditor";
import { OnboardingGuide } from "../OnboardingGuide";
import { challenges } from "~/features/playground/challenges";
import type {
  Challenge,
  ChallengeDifficulty,
} from "~/features/playground/types";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/DropdownMenu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { Slider } from "~/components/ui/slider";

import { useSoundStore } from "~/store/soundStore";

function VerticalTabs({
  tab,
  setTab,
  mainTab,
  onGuideClick,
  settingsPopoverOpen,
  setSettingsPopoverOpen,
}: {
  tab: "editor" | "challenges";
  setTab: (t: "editor" | "challenges") => void;
  mainTab: "challenge" | "free";
  onGuideClick: () => void;
  settingsPopoverOpen: boolean;
  setSettingsPopoverOpen: (open: boolean) => void;
}) {
  // play close sound when popover closes
  const playSound = useSoundStore((s) => s.playSound);
  const prevOpen = useRef(settingsPopoverOpen);
  useEffect(() => {
    if (prevOpen.current && !settingsPopoverOpen) {
      playSound("close");
    }
    prevOpen.current = settingsPopoverOpen;
  }, [settingsPopoverOpen, playSound]);

  return (
    <div className="flex flex-col border-r bg-muted h-full justify-between">
      <div>
        <Button
          variant={tab === "editor" ? "default" : "secondary"}
          onClick={() => setTab("editor")}
          style={{
            borderRadius: 0,
            minWidth: 45,
            minHeight: 45,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Code size={22} />
        </Button>
        {mainTab === "challenge" && (
          <Button
            data-onboarding="challenges-btn"
            variant={tab === "challenges" ? "default" : "secondary"}
            onClick={() => setTab("challenges")}
            style={{
              borderRadius: 0,
              minWidth: 45,
              minHeight: 45,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <List size={22} />
          </Button>
        )}
      </div>
      <div className="mb-2 flex flex-col gap-2">
        <Popover
          open={settingsPopoverOpen}
          onOpenChange={setSettingsPopoverOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              style={{
                borderRadius: 20,
                minWidth: 40,
                minHeight: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Configurações"
            >
              <Settings size={22} />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <h2 style={{ marginTop: 0 }}>Configurações</h2>
            <div style={{ margin: "16px 0" }}>
              {/* Tabs for settings */}
              <Tabs defaultValue="audio" className="w-full">
                <TabsList>
                  <TabsTrigger value="audio">Áudio</TabsTrigger>
                  {/* Future: <TabsTrigger value="visual">Visual</TabsTrigger> */}
                </TabsList>
                <TabsContent value="audio">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 24,
                    }}
                  >
                    <div
                      style={{
                        background: "#f6f6f6",
                        borderRadius: 8,
                        padding: 16,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 500,
                          marginBottom: 12,
                          fontSize: 15,
                        }}
                      >
                        Efeitos sonoros
                      </div>
                      {(() => {
                        const effectsVolume = useSoundStore(
                          (s) => s.effectsVolume,
                        );
                        const setEffectsVolume = useSoundStore(
                          (s) => s.setEffectsVolume,
                        );
                        const muted = useSoundStore((s) => s.muted);
                        const toggleMuted = useSoundStore((s) => s.toggleMuted);
                        const typingSoundEnabled = useSoundStore(
                          (s) => s.typingSoundEnabled,
                        );
                        const toggleTypingSound = useSoundStore(
                          (s) => s.toggleTypingSound,
                        ); // Lucide icons
                        // Import at top: import { Volume, VolumeX } from "lucide-react";
                        return (
                          <>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                marginBottom: 12,
                              }}
                            >
                              {/* Slider de volume */}
                              <Slider
                                min={0}
                                max={100}
                                value={[effectsVolume]}
                                onValueChange={([v]) => setEffectsVolume(v)}
                                style={{ maxWidth: 220 }}
                                disabled={muted}
                              />
                              {/* Botão de ativar/desativar som de digitação */}
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={toggleTypingSound}
                                style={{
                                  borderRadius: 20,
                                  marginLeft: 4,
                                  opacity: typingSoundEnabled ? 1 : 0.4,
                                  background: typingSoundEnabled
                                    ? "#e0ffe0"
                                    : undefined,
                                  color: typingSoundEnabled
                                    ? "#16a34a"
                                    : undefined,
                                }}
                                title={
                                  typingSoundEnabled
                                    ? "Desabilitar som de digitação"
                                    : "Habilitar som de digitação"
                                }
                                aria-label={
                                  typingSoundEnabled
                                    ? "Desabilitar som de digitação"
                                    : "Habilitar som de digitação"
                                }
                              >
                                <Keyboard size={20} />
                              </Button>
                              {/* Botão de mute */}
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={toggleMuted}
                                aria-label={
                                  muted ? "Desmutar efeitos" : "Mutar efeitos"
                                }
                                title={
                                  muted ? "Desmutar efeitos" : "Mutar efeitos"
                                }
                                style={{
                                  borderRadius: 20,
                                  marginLeft: 4,
                                  opacity: muted ? 0.5 : 1,
                                  background: muted ? "#ffe0e0" : "#e0ffe0",
                                  color: muted ? "#dc2626" : "#16a34a",
                                }}
                              >
                                {muted ? (
                                  <VolumeX size={22} />
                                ) : (
                                  <Volume size={22} />
                                )}
                              </Button>
                            </div>
                            <div
                              style={{
                                fontSize: 13,
                                color: "#888",
                                marginTop: 8,
                              }}
                            >
                              Volume: {effectsVolume}%
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <div
                      style={{
                        background: "#f6f6f6",
                        borderRadius: 8,
                        padding: 16,
                        opacity: 0.5,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 500,
                          marginBottom: 12,
                          fontSize: 15,
                        }}
                      >
                        Música
                      </div>
                      <div style={{ fontSize: 13, color: "#888" }}>
                        [Slider de música em breve]
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 24,
              }}
            >
              <Button
                variant="default"
                onClick={() => setSettingsPopoverOpen(false)}
                suppressClickSound
              >
                Fechar
              </Button>
            </div>{" "}
          </PopoverContent>{" "}
        </Popover>
        <Button
          variant="secondary"
          size="icon"
          onClick={onGuideClick}
          style={{
            borderRadius: 20,
            minWidth: 40,
            minHeight: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Guia de uso"
        >
          <CircleQuestionMark size={22} />
        </Button>
      </div>
    </div>
  );
}

function ChallengeList({
  challenges,
  selectedId,
  onSelect,
}: {
  challenges: Challenge[];
  selectedId: string | undefined;
  onSelect: (id: string) => void;
}) {
  // --- Debug unlock flag via localStorage ---
  // To unlock all challenges for dev/demo, run in console:
  //   localStorage.setItem('UNLOCK_ALL_CHALLENGES', '1'); location.reload();
  // To restore normal progression, run:
  //   localStorage.removeItem('UNLOCK_ALL_CHALLENGES'); location.reload();
  const unlockAll =
    typeof window !== "undefined" &&
    localStorage.getItem("UNLOCK_ALL_CHALLENGES") === "1";
  // --- End debug unlock flag ---

  // Determine which challenges are unlocked
  let unlockedUntil = 0;
  for (let i = 0; i < challenges.length; i++) {
    if (unlockAll) {
      unlockedUntil = challenges.length - 1;
      break;
    }
    if (challenges[i].progress === "completed") unlockedUntil = i + 1;
    else break;
  }
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {challenges.map((ch, idx) => {
        const unlocked = unlockAll || idx === 0 || idx <= unlockedUntil;
        return (
          <li key={ch.id}>
            <Button
              data-onboarding={idx === 0 ? "challenge-1-btn" : undefined}
              variant={selectedId === ch.id ? "default" : "ghost"}
              size="sm"
              style={{
                width: 30,
                minWidth: 30,
                maxWidth: 30,
                height: 30,
                minHeight: 30,
                maxHeight: 30,
                fontSize: 20,
                fontWeight: 700,
                fontFamily:
                  "'JetBrains Mono', 'Fira Mono', 'Menlo', 'monospace', 'Arial Rounded MT Bold', Arial, sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 4,
                padding: 0,
                opacity: unlocked ? 1 : 0.8,
                cursor: unlocked ? "pointer" : "not-allowed",
                background: unlocked ? undefined : "#f3f3f3",
              }}
              onClick={unlocked ? () => onSelect(ch.id) : undefined}
              title={
                unlocked
                  ? ch.name
                  : "Complete o desafio anterior para desbloquear"
              }
              disabled={!unlocked}
            >
              {unlocked ? `#${idx + 1}` : <Lock size={18} />}
            </Button>
          </li>
        );
      })}{" "}
    </ul>
  );
}

import { useChallengeVoxels } from "~/features/playground/lib/ChallengeVoxelsProvider";

import {
  saveChallengeProgress,
  loadChallengeProgress,
} from "~/features/playground/lib/persistence";

import { Modal } from "~/components/ui/Modal";

function ChallengeDescription({
  challenge,
  code,
  setCode,
  onTryItOut,
  canStart,
  isStarted,
}: {
  challenge: Challenge;
  code: string;
  setCode: (c: string) => void;
  onTryItOut: () => void;
  canStart: boolean;
  isStarted: boolean;
}) {
  const [showResetModal, setShowResetModal] = useState(false);
  const { getVoxelsForChallenge } = useChallengeVoxels();
  const voxels = getVoxelsForChallenge(challenge.id);
  return (
    <div data-onboarding="challenge-desc">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
        {challenge.name}
      </h3>
      {challenge.description.lead && (
        <p className="text-muted-foreground text-xl leading-7 mb-2">
          {challenge.description.lead}
        </p>
      )}
      {challenge.description.paragraphs &&
        challenge.description.paragraphs.map((para, i) => (
          <p key={i} className="leading-7 mb-2">
            {para}
          </p>
        ))}
      {challenge.description.code && (
        <pre className="bg-muted rounded px-3 py-2 font-mono text-sm font-semibold mb-2 whitespace-pre-wrap">
          {challenge.description.code}
        </pre>
      )}
      {challenge.description.tips && (
        <ul className="my-3 ml-6 list-disc text-muted-foreground text-sm">
          {challenge.description.tips.map((tip, i) => (
            <li key={i} className="mt-1">
              {tip}
            </li>
          ))}
        </ul>
      )}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Button
          data-onboarding="start-btn"
          onClick={onTryItOut}
          variant="default"
          size="icon"
          title="Iniciar desafio"
          disabled={!canStart || isStarted}
        >
          <Play />
        </Button>{" "}
        {/* Modal de confirmação para resetar progresso */}
        {showResetModal && (
          <Modal open={showResetModal} onClose={() => setShowResetModal(false)}>
            <div style={{ textAlign: "center", padding: 16 }}>
              <div style={{ marginBottom: 16 }}>
                Tem certeza que deseja apagar todo o progresso deste desafio?
                <br />
                Esta ação não pode ser desfeita.
              </div>
              <div
                style={{ display: "flex", justifyContent: "center", gap: 16 }}
              >
                <Button
                  variant="destructive"
                  onClick={() => {
                    localStorage.removeItem(
                      `challenge-progress-${challenge.id}`,
                    );
                    setCode(challenge.description.code || "");
                    setShowResetModal(false);
                  }}
                  suppressClickSound
                >
                  Apagar progresso
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowResetModal(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Modal>
        )}
        <Button
          variant="default"
          size="icon"
          title="Restaurar progresso"
          onClick={() => setShowResetModal(true)}
          disabled={!isStarted}
        >
          <Download />
        </Button>{" "}
      </div>
    </div>
  );
}

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";

export function LeftPanel({
  code,
  setCode,
  selectedChallengeId,
  setSelectedChallengeId,
  mainTab,
}: {
  code: string;
  setCode: (c: string) => void;
  selectedChallengeId: string | null;
  setSelectedChallengeId: (id: string) => void;
  mainTab: "challenge" | "free";
}) {
  const [tab, setTab] = useState<"editor" | "challenges">("editor");
  const [difficulty, setDifficulty] = useState<ChallengeDifficulty>("tutorial");
  const [guideOpen, setGuideOpen] = useState(false);
  const [settingsPopoverOpen, setSettingsPopoverOpen] = useState(false);
  const [startedChallengeId, setStartedChallengeId] = useState<string | null>(
    null,
  );

  const filteredChallenges = challenges.filter(
    (c) => c.difficulty === difficulty
  );
  const selectedChallenge =
    challenges.find((c) => c.id === selectedChallengeId) ??
    filteredChallenges[0];
  // Determine which challenges are unlocked
  let unlockedUntil = 0;
  for (let i = 0; i < filteredChallenges.length; i++) {
    if (filteredChallenges[i].progress === "completed") unlockedUntil = i + 1;
    else break;
  }
  const selectedIdx = filteredChallenges.findIndex(
    (c) => c.id === selectedChallenge?.id,
  );
  const canStart = selectedIdx === 0 || selectedIdx <= unlockedUntil;
  const isStarted = startedChallengeId === selectedChallenge?.id;

  return (
    <div className="flex flex-row h-full flex-1 min-w-0 min-h-0 self-stretch border-r border-border">
      {/* Onboarding Guide integration */}
      <OnboardingGuide onFinish={() => setTab("editor")} />
      <VerticalTabs
        tab={tab}
        setTab={setTab}
        mainTab={mainTab}
        onGuideClick={() => setGuideOpen(true)}
        settingsPopoverOpen={settingsPopoverOpen}
        setSettingsPopoverOpen={setSettingsPopoverOpen}
      />
      <div style={{ flex: 1, minHeight: 0, minWidth: 0, height: "100%" }}>
        {tab === "editor" && (
          <div style={{ height: "100%", width: "100%" }}>
            {mainTab === "free" ? (
              <CodeEditor code={code} onChange={setCode} />
            ) : isStarted ? (
              <CodeEditor code={code} onChange={setCode} />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <span>Selecione e inicie um desafio para editar o código.</span>
              </div>
            )}
          </div>
        )}
        {tab === "challenges" && (
          <div style={{ padding: 16, height: "100%", overflow: "auto" }}>
            <div
              style={{ display: "flex", flexDirection: "row", height: "100%" }}
            >
              {/* Coluna 1: Dificuldades */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginRight: 16,
                }}
              >
                {(
                  [
                    { label: "Tutorial", value: "tutorial" },
                    { label: "Iniciante", value: "iniciante" },
                    { label: "Desafiador", value: "desafiador" },
                  ] as { label: string; value: ChallengeDifficulty }[]
                ).map((d) => (
                  <Button
                    key={d.value}
                    data-onboarding={
                      d.value === "tutorial" ? "tutorial-btn" : undefined
                    }
                    variant={difficulty === d.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDifficulty(d.value)}
                    style={{ minWidth: 100 }}
                  >
                    {d.label}
                  </Button>
                ))}
              </div>
              {/* Coluna 2: Desafios */}{" "}
              <div style={{ minWidth: 60, marginRight: 16 }}>
                <ChallengeList
                  challenges={filteredChallenges}
                  selectedId={selectedChallenge?.id}
                  onSelect={setSelectedChallengeId}
                />
              </div>
              {/* Coluna 3: Detalhes do Desafio */}{" "}
              <div style={{ flex: 2, minWidth: 0 }}>
                {selectedChallenge && (
                  <ChallengeDescription
                    challenge={selectedChallenge}
                    code={code}
                    setCode={setCode}
                    onTryItOut={() => {
                      setStartedChallengeId(selectedChallenge.id);
                      setCode("// Write your code here\n");
                    }}
                    canStart={canStart}
                    isStarted={isStarted}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Modal for guide is not implemented, replace or remove as needed */}
      {/* <Modal open={guideOpen} onClose={() => setGuideOpen(false)}>
         <h2 style={{ marginTop: 0 }}>Guia de uso</h2>
         <p>Guia de uso em breve...</p>
         <div
           style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}
         >
           <Button
             variant="default"
             onClick={() => setGuideOpen(false)}
             suppressClickSound
           >
             Fechar
           </Button>
         </div>
       </Modal> */}
    </div>
  );
}
