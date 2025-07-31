import type { VoxelData } from "../types";

export type ChallengeProgressLocal = {
  id: string;
  userCode: string;
  userVoxels: VoxelData[];
  feedback: number;
  timestamp: number;
};

export function saveChallengeProgress(
  challengeId: string,
  userCode: string,
  userVoxels: VoxelData[],
  feedback: number,
) {
  const progress: ChallengeProgressLocal = {
    id: challengeId,
    userCode,
    userVoxels,
    feedback,
    timestamp: Date.now(),
  };
  localStorage.setItem(
    `challenge-progress-${challengeId}`,
    JSON.stringify(progress),
  );
}

export function loadChallengeProgress(
  challengeId: string,
): ChallengeProgressLocal | null {
  const saved = localStorage.getItem(`challenge-progress-${challengeId}`);
  return saved ? JSON.parse(saved) : null;
}
