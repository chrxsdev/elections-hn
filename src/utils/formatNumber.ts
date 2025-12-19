export function floorTo(n: number, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.floor((n + Number.EPSILON) * factor) / factor;
}

export function getPercentage(votes: number, totalVotes: number): number {
  if (totalVotes === 0) return 0;
  return (votes / totalVotes) * 100;
}