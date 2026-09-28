export type MatchOutcome = "WIN" | "LOSS" | "DRAW";

export type MatchMode = "ranked" | "casual" | "private" | "squad";

export type MatchDifficulty = "EASY" | "MEDIUM" | "HARD";

export interface OpponentProfile {
  name: string;
  handle: string;
  initials: string;
  rankTitle: string;
  elo: number;
  avatarSrc?: string;
}

export interface ProblemDetails {
  id: string;
  title: string;
  difficulty: MatchDifficulty;
  topic: string;
}

export interface MatchRecord {
  id: string;
  outcome: MatchOutcome;
  mode: MatchMode;
  opponent: OpponentProfile;
  problem: ProblemDetails;
  runtime: string;
  duration: string;
  testsPassed: number;
  testsTotal: number;
  testsNote?: string;
  eloDelta: number;
  date: string;
  timestamp: string;
  groupKey: "today" | "yesterday" | "earlier" | "previous";
  groupLabel: string;
}

export interface MatchesFilterState {
  mode: MatchMode | "all";
  searchQuery: string;
  outcome: "all" | "win" | "loss" | "draw";
  difficulty: "all" | "easy" | "medium" | "hard";
  runtime: string;
  topic: string;
  season: string;
  sortBy: "latest" | "elo_delta" | "fastest" | "difficulty";
}

export interface MatchesSummaryTelemetry {
  currentElo: number;
  eloDelta: number;
  rankTitle: string;
  tier: string;
  totalMatches: number;
  rankedWins: number;
  rankedLosses: number;
  winRate: number;
  winRateDelta: number;
  recentForm: string;
  season: string;
  seasonDelta: number;
  peakElo: number;
  avgSolveDuration: string;
  speedPercentile: string;
}

export interface SeasonArchiveSummary {
  season: string;
  rankedRecord: string;
  peakElo: number;
  bestStreak: string;
  mostPlayedRuntime: string;
  totalVolume: number;
}
