export interface RankMovement {
  id: string;
  matchId?: string;
  outcome: "VICTORY" | "DEFEAT";
  opponent: string;
  topic: string;
  xpDelta: number;
  eloDelta: number;
  xpBefore: number;
  xpAfter: number;
  date: string;
}

export interface RankDivision {
  name: string;
  xpRequired: number;
  status: "COMPLETED" | "CURRENT" | "LOCKED";
  progressPercent?: number;
}

export interface RankTier {
  id: string;
  name: string;
  tierNumber: number;
  badgeTag: "APEX TIER" | "CURRENT TIER" | "SURPASSED" | "ORIGIN";
  description: string;
  bracket: string;
  status: "LOCKED" | "CURRENT" | "CLEARED";
  entryThreshold?: string;
  divisionsSummary?: string;
  divisions?: {
    name: string;
    xp: string;
    isCurrent?: boolean;
    isCompleted?: boolean;
  }[];
}

export interface RankProfileData {
  tierId: string;
  tierName: string;
  tierRoman: string;
  tagline: string;
  currentXp: number;
  targetXp: number;
  xpRemaining: number;
  nextTierName: string;
  divisionProgressPercent: number;
  competitiveElo: number;
  topSegmentPercent: number;
  seasonPeakRank: string;
  seasonPeakDate: string;
  globalRank: number;
  cluster: string;
  apexTargetTier: string;
  apexTargetXp: number;
  apexProgressPercent: number;
  performance: {
    startedAt: string;
    startedXp: number;
    xpAccumulated: number;
    rankedRecord: string;
    winProbability: number;
    streakPeak: number;
    activeStreak: string;
  };
  divisions: RankDivision[];
  recentMovement: RankMovement[];
  tierLadder: RankTier[];
}
