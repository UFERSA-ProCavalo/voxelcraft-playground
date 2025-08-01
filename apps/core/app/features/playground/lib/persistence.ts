import type { VoxelData } from "../types";

export type ChallengeProgressLocal = {
  id: string;
  userCode: string;
  userVoxels: VoxelData[];
  feedback: number;
  timestamp: number;
  seen?: boolean; // true if success modal was seen
};

export function saveChallengeProgress(
  challengeId: string,
  userCode: string,
  userVoxels: VoxelData[],
  feedback: number,
  seen?: boolean,
) {
  const progress: ChallengeProgressLocal = {
    id: challengeId,
    userCode,
    userVoxels,
    feedback,
    timestamp: Date.now(),
    seen,
  };
  localStorage.setItem(
    `challenge-progress-${challengeId}`,
    JSON.stringify(progress),
  );
}

export function setChallengeSeen(challengeId: string) {
  const progress = loadChallengeProgress(challengeId);
  if (progress) {
    progress.seen = true;
    localStorage.setItem(
      `challenge-progress-${challengeId}`,
      JSON.stringify(progress),
    );
  }
}

export function loadChallengeProgress(
  challengeId: string,
): ChallengeProgressLocal | null {
  const saved = localStorage.getItem(`challenge-progress-${challengeId}`);
  return saved ? JSON.parse(saved) : null;
}
