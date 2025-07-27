import React, { createContext, useContext, useEffect, useState } from "react";
import type { ChallengeVoxels } from "./loadChallengeVoxels";
import { loadChallengeVoxels } from "./loadChallengeVoxels";

interface ChallengeVoxelsContextValue {
  voxels: ChallengeVoxels[];
  loading: boolean;
  getVoxelsForChallenge: (id: string) => ChallengeVoxels["voxels"] | undefined;
}

const ChallengeVoxelsContext = createContext<
  ChallengeVoxelsContextValue | undefined
>(undefined);

export function ChallengeVoxelsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [voxels, setVoxels] = useState<ChallengeVoxels[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChallengeVoxels().then((data) => {
      setVoxels(data);
      setLoading(false);
    });
  }, []);

  const getVoxelsForChallenge = (id: string) =>
    voxels.find((v) => v.id === id)?.voxels;

  return (
    <ChallengeVoxelsContext.Provider
      value={{ voxels, loading, getVoxelsForChallenge }}
    >
      {children}
    </ChallengeVoxelsContext.Provider>
  );
}

export function useChallengeVoxels() {
  const ctx = useContext(ChallengeVoxelsContext);
  if (!ctx)
    throw new Error(
      "useChallengeVoxels must be used within ChallengeVoxelsProvider",
    );
  return ctx;
}
