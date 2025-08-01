// Utilitário para buscar e cachear voxels dos desafios a partir do JSON pré-computado

export interface ChallengeVoxels {
  id: string;
  name: string;
  voxels: Array<{
    position: [number, number, number];
    color?: string;
  }>;
}

let cache: ChallengeVoxels[] | undefined;

export async function loadChallengeVoxels(): Promise<ChallengeVoxels[]> {
  if (cache) return cache as ChallengeVoxels[];
  const res = await fetch("/challenges-with-voxels.json");
  if (!res.ok) throw new Error("Failed to load challenge voxels");
  cache = await res.json();
  return cache as ChallengeVoxels[];
}

export async function getVoxelsForChallenge(id: string) {
  const all = await loadChallengeVoxels();
  return all.find((c) => c.id === id)?.voxels || [];
}
