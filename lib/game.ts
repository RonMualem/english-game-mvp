
export const LEVELS = [
  { id: 1, name: 'Beginner', timeLimitSec: 20, basePoints: 10 },
  { id: 2, name: 'Intermediate', timeLimitSec: 15, basePoints: 20 },
  { id: 3, name: 'Advanced', timeLimitSec: 10, basePoints: 35 },
];

export function computePoints(levelId: number, elapsedMs: number, correct: boolean) {
  const level = LEVELS.find(l => l.id === levelId) ?? LEVELS[0];
  if (!correct) return 0;
  const timeBonus = Math.max(0, (level.timeLimitSec * 1000 - elapsedMs) / 1000);
  return Math.round(level.basePoints + timeBonus);
}
