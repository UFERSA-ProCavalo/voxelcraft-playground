import { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { challenges } from "../../challenges";
import type { Challenge, ChallengeDifficulty } from "../../types";
import { Button } from "../ui/button";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #eee",
        background: "#fafbfc",
      }}
    >
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
      {challenges.map((ch) => (
        <li key={ch.id}>
          <Button
            variant={selectedId === ch.id ? "default" : "ghost"}
            size="sm"
            style={{
              width: "100%",
              justifyContent: "flex-start",
              marginBottom: 4,
            }}
            onClick={() => onSelect(ch.id)}
          >
            {ch.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}

import { useChallengeVoxels } from "../../lib/ChallengeVoxelsProvider";

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
      <button
        onClick={onTryItOut}
        style={{
          marginBottom: 8,
          padding: "4px 12px",
          borderRadius: 4,
          background: "#e0e0e0",
          border: "none",
          cursor: "pointer",
        }}
      >
        Tentar desafio
      </button>
      {/* TODO: Add preview of voxels here if desired */}
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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        flex: 1,
        minWidth: 0,
        minHeight: 0,
        alignSelf: "stretch",
        borderRight: "1px solid #eee",
      }}
    >
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
