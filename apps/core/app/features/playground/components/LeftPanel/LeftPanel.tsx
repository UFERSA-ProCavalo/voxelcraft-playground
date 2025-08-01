import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { CodeEditor } from "./CodeEditor";
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

  const { theme } = useTheme();

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
                  <TabsTrigger value="visual">Visual</TabsTrigger>
                </TabsList>
                <TabsContent value="audio">
                  <div className="flex flex-col gap-4">
                    <div className="bg-background-secondary p-4 rounded-md">
                      <div className="font-medium text-lg mb-3">
                        Efeitos sonoros
                      </div>
                      {(() => {
                        const effectsVolume = useSoundStore(
                          (s) => s.effectsVolume
                        );
                        const setEffectsVolume = useSoundStore(
                          (s) => s.setEffectsVolume
                        );
                        const muted = useSoundStore((s) => s.muted);
                        const toggleMuted = useSoundStore((s) => s.toggleMuted);

                        return (
                          <>
                            <div className="flex items-center gap-3 mb-3">
                              <Slider
                                min={0}
                                max={100}
                                value={[effectsVolume]}
                                onValueChange={([v]) => setEffectsVolume(v)}
                                style={{ maxWidth: 220 }}
                                disabled={muted}
                              />
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
                                style={{ borderRadius: 20 }}
                              >
                                {muted ? (
                                  <VolumeX size={22} />
                                ) : effectsVolume < 50 ? (
                                  <Volume size={22} />
                                ) : (
                                  <Volume2 size={22} />
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
                    <div className="bg-background-secondary p-4 rounded-md">
                      <div className="font-medium mb-3 text-lg">Música</div>
                      <div style={{ fontSize: 13, color: "#888" }}>
                        [Slider de música em breve]
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="visual">
                  <div className="flex flex-col gap-4">
                    <div className="bg-background-secondary p-4 rounded-md">
                      <div className="flex p-2 justify-between">
                        Tema
                        <ModeToggle />
                      </div>
                      <div className="text-sm text-foreground-secondary">
                        {theme === "dark" && (
                          <>
                            O tema escuro é ideal para ambientes com pouca luz.
                          </>
                        )}
                        {theme === "light" && (
                          <>
                            O tema claro é ideal para ambientes bem iluminados.
                          </>
                        )}
                        {theme === "system" && (
                          <>
                            O tema "sistema" adapta-se automaticamente ao tema
                            do seu sistema operacional.
                          </>
                        )}
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
  // Determine which challenges are unlocked
  let unlockedUntil = 0;
  const unlockAll =
    typeof window !== "undefined" && (window as any).__UNLOCK_ALL_CHALLENGES__;
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
        const unlockAll =
          typeof window !== "undefined" &&
          (window as any).__UNLOCK_ALL_CHALLENGES__;
        const unlocked = unlockAll || idx === 0 || idx <= unlockedUntil;
        return (
          <li key={ch.id}>
            <Button
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
      })}
    </ul>
  );
}

import { useChallengeVoxels } from "~/features/playground/lib/ChallengeVoxelsProvider";

import {
  saveChallengeProgress,
  loadChallengeProgress,
} from "~/features/playground/lib/persistence";

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
  const { getVoxelsForChallenge } = useChallengeVoxels();
  const voxels = getVoxelsForChallenge(challenge.id);
  return (
    <div>
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
          onClick={onTryItOut}
          variant="default"
          size="icon"
          title="Iniciar desafio"
          disabled={!canStart || isStarted}
        >
          <Play />
        </Button>
        <Button
          variant="default"
          size="icon"
          title="Salvar progresso"
          onClick={() => {
            saveChallengeProgress(challenge.id, code, [], 0);
            window.alert("Progresso salvo!");
          }}
          disabled={!isStarted}
        >
          <Save />
        </Button>
        <Button
          variant="default"
          size="icon"
          title="Restaurar progresso"
          onClick={() => {
            const progress = loadChallengeProgress(challenge.id);
            if (progress && progress.userCode) {
              setCode(progress.userCode);
              window.alert("Progresso restaurado!");
            } else {
              window.alert("Nenhum progresso salvo encontrado.");
            }
          }}
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
import { cn } from "~/lib/utils";
import { ModeToggle } from "~/components/ModeToggle";
import { useTheme } from "~/components/theme-provider";

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
    null
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
    (c) => c.id === selectedChallenge?.id
  );
  const canStart = selectedIdx === 0 || selectedIdx <= unlockedUntil;
  const isStarted = startedChallengeId === selectedChallenge?.id;

  return (
    <div className="flex flex-row h-full flex-1 min-w-0 min-h-0 self-stretch border-r border-border">
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
