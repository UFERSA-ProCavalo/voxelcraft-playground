import { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { challenges } from "~/features/playground/challenges";
import type {
  Challenge,
  ChallengeDifficulty,
} from "~/features/playground/types";
import { Button } from "~/components/ui/button";

const DIFFICULTIES: { label: string; value: ChallengeDifficulty }[] = [
  { label: "Tutorial", value: "tutorial" },
  { label: "Iniciante", value: "iniciante" },
  { label: "Desafiador", value: "desafiador" },
];

function VerticalTabs({
  tab,
  setTab,
}: {
  tab: "editor" | "challenges";
  setTab: (t: "editor" | "challenges") => void;
}) {
  return (
    <div className="flex flex-col border-r bg-muted">
      <Button
        variant={tab === "editor" ? "default" : "ghost"}
        onClick={() => setTab("editor")}
        style={{ borderRadius: 0, minWidth: 48, minHeight: 48 }}
      >
        Editor
      </Button>
      <Button
        variant={tab === "challenges" ? "default" : "ghost"}
        onClick={() => setTab("challenges")}
        style={{ borderRadius: 0, minWidth: 48, minHeight: 48 }}
      >
        Desafios
      </Button>
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

function ChallengeDescription({
  challenge,
  onTryItOut,
}: {
  challenge: Challenge;
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
      <Button
        onClick={onTryItOut}
        variant="secondary"
        size="sm"
        style={{ marginBottom: 8 }}
      >
        Tentar desafio
      </Button>
    </div>
  );
}

export function LeftPanel({
  code,
  setCode,
  selectedChallengeId,
  setSelectedChallengeId,
}: {
  code: string;
  setCode: (c: string) => void;
  selectedChallengeId: string | null;
  setSelectedChallengeId: (id: string) => void;
}) {
  const [tab, setTab] = useState<"editor" | "challenges">("editor");
  const [difficulty, setDifficulty] = useState<ChallengeDifficulty>("tutorial");

  const filteredChallenges = challenges.filter(
    (c) => c.difficulty === difficulty,
  );
  const selectedChallenge =
    challenges.find((c) => c.id === selectedChallengeId) ??
    filteredChallenges[0];

  return (
    <div className="flex flex-row h-full flex-1 min-w-0 min-h-0 self-stretch border-r border-border">
      <VerticalTabs tab={tab} setTab={setTab} />
      <div style={{ flex: 1, minHeight: 0 }}>
        {tab === "editor" && (
          <div style={{ height: "100%" }}>
            <CodeEditor code={code} onChange={setCode} />
          </div>
        )}
        {tab === "challenges" && (
          <div style={{ padding: 16, height: "100%", overflow: "auto" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {DIFFICULTIES.map((d) => (
                <Button
                  key={d.value}
                  variant={difficulty === d.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDifficulty(d.value)}
                >
                  {d.label}
                </Button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <ChallengeList
                  challenges={filteredChallenges}
                  selectedId={selectedChallenge?.id}
                  onSelect={setSelectedChallengeId}
                />
              </div>
              <div style={{ flex: 2, minWidth: 0 }}>
                {selectedChallenge && (
                  <ChallengeDescription
                    challenge={selectedChallenge}
                    onTryItOut={() => {
                      setCode(selectedChallenge.starterCode);
                      setSelectedChallengeId(selectedChallenge.id);
                    }}
                  />
                )}{" "}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
