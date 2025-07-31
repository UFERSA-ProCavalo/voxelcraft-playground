import { useState } from "react";
import {
  Save,
  Download,
  Play,
  Code,
  List,
  CircleQuestionMark,
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

const DIFFICULTIES: { label: string; value: ChallengeDifficulty }[] = [
  { label: "Tutorial", value: "tutorial" },
  { label: "Iniciante", value: "iniciante" },
  { label: "Desafiador", value: "desafiador" },
];

function VerticalTabs({
  tab,
  setTab,
  mainTab,
  onGuideClick,
}: {
  tab: "editor" | "challenges";
  setTab: (t: "editor" | "challenges") => void;
  mainTab: "challenge" | "free";
  onGuideClick: () => void;
}) {
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
      <div className="mb-2">
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
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {challenges.map((ch, idx) => (
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
            }}
            onClick={() => onSelect(ch.id)}
            title={ch.name}
          >
            {`#${idx + 1}`}
          </Button>
        </li>
      ))}
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
}: {
  challenge: Challenge;
  code: string;
  setCode: (c: string) => void;
  onTryItOut: () => void;
}) {
  const { getVoxelsForChallenge } = useChallengeVoxels();
  const voxels = getVoxelsForChallenge(challenge.id);
  return (
    <div>
      <h3 style={{ margin: "0 0 8px 0" }}>{challenge.name}</h3>
      <p style={{ margin: "0 0 8px 0", fontSize: 14 }}>
        {challenge.description}
      </p>
      <pre
        style={{
          background: "#f6f6f6",
          padding: 8,
          borderRadius: 4,
          fontSize: 13,
          marginBottom: 8,
        }}
      >
        {challenge.starterCode}
      </pre>
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
        >
          <Download />
        </Button>{" "}
      </div>
    </div>
  );
}

import { Modal } from "~/components/ui/Modal";

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

  const filteredChallenges = challenges.filter(
    (c) => c.difficulty === difficulty,
  );
  const selectedChallenge =
    challenges.find((c) => c.id === selectedChallengeId) ??
    filteredChallenges[0];

  return (
    <div className="flex flex-row h-full flex-1 min-w-0 min-h-0 self-stretch border-r border-border">
      <VerticalTabs
        tab={tab}
        setTab={setTab}
        mainTab={mainTab}
        onGuideClick={() => setGuideOpen(true)}
      />
      <div style={{ flex: 1, minHeight: 0 }}>
        {tab === "editor" && (
          <div style={{ height: "100%" }}>
            <CodeEditor code={code} onChange={setCode} />
          </div>
        )}
        {tab === "challenges" && (
          <div style={{ padding: 16, height: "100%", overflow: "auto" }}>
            <div
              style={{ display: "flex", flexDirection: "row", height: "100%" }}
            >
              {/* Column 1: Difficulties */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginRight: 16,
                }}
              >
                {DIFFICULTIES.map((d) => (
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
              {/* Column 2: Challenges */}
              <div style={{ minWidth: 60, marginRight: 16 }}>
                <ChallengeList
                  challenges={filteredChallenges}
                  selectedId={selectedChallenge?.id}
                  onSelect={setSelectedChallengeId}
                />
              </div>
              {/* Column 3: Challenge Details */}
              <div style={{ flex: 2, minWidth: 0 }}>
                {selectedChallenge && (
                  <ChallengeDescription
                    challenge={selectedChallenge}
                    code={code}
                    setCode={setCode}
                    onTryItOut={() => {
                      setCode(selectedChallenge.starterCode);
                      setSelectedChallengeId(selectedChallenge.id);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal open={guideOpen} onClose={() => setGuideOpen(false)}>
        <h2 style={{ marginTop: 0 }}>Guia de uso</h2>
        <p>Guia de uso em breve...</p>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}
        >
          <Button variant="default" onClick={() => setGuideOpen(false)}>
            Fechar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
