export interface CodeForensics {
  language: string;
  engine: string;
  lockedAt: string;
  attempts: number;
  passRatio: string;
  rssMemoryMb: number;
  filename: string;
  codeLines: {
    line: number;
    text: string;
    isHighlighted?: boolean;
    highlightType?: "success" | "failure";
    comment?: string;
  }[];
}

export interface VisibleTestCase {
  id: string;
  title: string;
  runtime: string;
  input: string;
  output: string;
  isMatch: boolean;
}

export interface HiddenTestAnomaly {
  id: string;
  label: string;
  complexityClass: string;
  playerResult: {
    status: "PASS" | "FAIL" | "TLE" | "PANIC";
    text: string;
    runtimeMs?: number;
  };
  opponentResult: {
    status: "PASS" | "FAIL" | "TLE" | "PANIC";
    text: string;
    runtimeMs?: number;
  };
  isAnomaly?: boolean;
}

export interface MatchTimelineEvent {
  tick: string;
  title: string;
  description: string;
  badge: string;
  actor: "nano" | "opponent" | "system";
  badgeVariant?: "success" | "failure" | "warning" | "neutral" | "secondary" | "volt";
}

export interface PracticeDrill {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estMinutes: number;
  description: string;
  tags: string[];
}

export interface MatchReportDetails {
  matchId: string;
  hash: string;
  tierLabel: string;
  targetProblem: {
    id: string;
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    topic: string;
  };
  timestamp: string;
  duration: string;
  modeLabel: string;
  player: {
    name: string;
    role: string;
    runtime: string;
    avatarUrl: string;
    outcome: "WIN" | "LOSS" | "DRAW";
    eloDelta: number;
    testsPassed: number;
    testsTotal: number;
    runtimeMs: number;
    memoryMb: number;
    submissionTime: string;
    eloPre: number;
    eloPost: number;
  };
  opponent: {
    name: string;
    role: string;
    runtime: string;
    avatarUrl: string;
    outcome: "WIN" | "LOSS" | "DRAW";
    eloDelta: number;
    testsPassed: number;
    testsTotal: number;
    runtimeMs: number;
    memoryMb: number;
    submissionTime: string;
    eloPre: number;
    eloPost: number;
    timeDeltaNote?: string;
  };
  decidingFactor: {
    clause: string;
    title: string;
    summary: string;
    analysis: string;
    priorityStack: {
      priority: string;
      name: string;
      status: string;
      highlight?: boolean;
    }[];
  };
  playerForensics: CodeForensics;
  opponentForensics: CodeForensics;
  algorithmicDiagnosis: string;
  visibleTests: VisibleTestCase[];
  hiddenSuite: HiddenTestAnomaly[];
  metrics: {
    playerNormalizedRuntime: number;
    opponentNormalizedRuntime: number;
    playerMemoryPercent: number;
    opponentMemoryPercent: number;
    playerIntegrityPercent: number;
    opponentIntegrityPercent: number;
    playerAttempts: number;
    opponentAttempts: number;
    playerWallClock: string;
    opponentWallClock: string;
    playerAstDepth: number;
    opponentAstDepth: number;
  };
  timeline: MatchTimelineEvent[];
  eloProgression: {
    currentTier: string;
    targetTier: string;
    targetElo: number;
    progressPercent: number;
    eloRemaining: number;
    lastFive: ("W" | "L" | "D")[];
    winProbability: number;
    kFactor: number;
  };
  drills: PracticeDrill[];
}
