import { MatchReportDetails } from "@/types/match-report";
import { ALL_MATCHES_DATA } from "./matches-data";

export const MATCH_REPORT_CC10482: MatchReportDetails = {
  matchId: "CC-10482",
  hash: "0x9e4a8b...10482",
  tierLabel: "TIER II RANKED",
  targetProblem: {
    id: "CC-10482",
    title: "Circular Packet Route",
    difficulty: "MEDIUM",
    topic: "graphs",
  },
  timestamp: "SEP 22 · 21:14 UTC",
  duration: "06:49",
  modeLabel: "RANKED · STANDARD BREACH",
  player: {
    name: "NANO",
    role: "PLAYER",
    runtime: "Python 3.12 · CPython Engine",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6YXBGW_Ld7YbXR2NHDBfU1FQ0DlNGPAGqlYqAnYZdhVu1uDT8JCUaYTSX77NnoukOpfc4ipVNLw8tsPKR9_iBG1YUK9JVXqyKqDT43VN05jgEGQDfaQhbegR-RlCDY3SR8jjspVsohP_J0-KbY232YUXyIFCyYsI0MDQ3o7V01rjkclh5hx6qvii2kWGSGK4BcrGzr63qkh9swoUpdW9VTRAtq-ciRyMbRxTajHjmXi8Ok3XfygVfnA",
    outcome: "WIN",
    eloDelta: 18,
    testsPassed: 40,
    testsTotal: 40,
    runtimeMs: 81,
    memoryMb: 18.2,
    submissionTime: "06:46",
    eloPre: 1248,
    eloPost: 1266,
  },
  opponent: {
    name: "BYTEGHOST",
    role: "GUEST",
    runtime: "Rust 1.76 · LLVM 17 Target",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAM8-jd6GTrlakLkYMjQ33ikIcCfvO61Y0gLuH8TaZCo9BxB1sd_Zj9i4wU0q5hrT-IisYQKcV0uRN9KC6sV-v7HuKUb2IatBgCtbtcJAFmA1M2nDtkSxHdc6yIS0X3mmmNFYDsUGiwCYqsIAAbQINZaCrz5GqZaQZsx7uZpWjmdH9ahKksmj4l28X5d7UqPq8ZmIgT92JsbRD23iYLJiv69Xl1353tULRUoGWy3GGkke9aH4zEnmmK4A",
    outcome: "LOSS",
    eloDelta: -16,
    testsPassed: 37,
    testsTotal: 40,
    runtimeMs: 73,
    memoryMb: 17.8,
    submissionTime: "05:09",
    eloPre: 1273,
    eloPost: 1257,
    timeDeltaNote: "Faster (-8ms)",
  },
  decidingFactor: {
    clause: "CLAUSE 4.2",
    title: "DECIDING FACTOR: CORRECTNESS FIRST",
    summary:
      "NANO passed the complete 40/40 hidden test suite. BYTEGHOST failed 3 hidden edge cases on cycle termination.",
    analysis:
      "Byteghost finished faster (73ms vs 81ms) and submitted earlier (05:09 vs 06:46), but under CodeClash competitive regulations, test validity takes unconditional priority over raw execution speed.",
    priorityStack: [
      {
        priority: "01 // DECIDER",
        name: "Correctness",
        status: "Nano: 40/40",
        highlight: true,
      },
      {
        priority: "02 // BYPASS",
        name: "Runtime",
        status: "Not needed",
      },
      {
        priority: "03 // BYPASS",
        name: "Submit Clock",
        status: "Not needed",
      },
    ],
  },
  playerForensics: {
    language: "Python 3.12",
    engine: "CPython Engine",
    lockedAt: "06:46 LOCKED",
    attempts: 3,
    passRatio: "40/40 PASS",
    rssMemoryMb: 18.2,
    filename: "solution.py",
    codeLines: [
      { line: 1, text: "from collections import deque" },
      { line: 2, text: "" },
      { line: 3, text: "def find_optimal_route(nodes: int, packets: list[list[int]]) -> int:" },
      { line: 4, text: "    # Adjacency list representation with cycle guards" },
      { line: 5, text: "    graph = {i: [] for i in range(nodes)}" },
      { line: 6, text: "    for u, v, w in packets:" },
      { line: 7, text: "        graph[u].append((v, w))" },
      { line: 8, text: "" },
      { line: 9, text: "    visited = set()" },
      { line: 10, text: "    in_degree = [0] * nodes" },
      { line: 11, text: "    queue = deque([0])" },
      { line: 12, text: "    cost = 0" },
      { line: 13, text: "" },
      { line: 14, text: "    # CRITICAL: Nano explicitly handles circular packet resets" },
      { line: 15, text: "    while queue:", isHighlighted: true, highlightType: "success" },
      { line: 16, text: "        curr = queue.popleft()", isHighlighted: true, highlightType: "success" },
      { line: 17, text: "        if curr in visited:", isHighlighted: true, highlightType: "success" },
      { line: 18, text: "            continue  # Safe cycle break on self-referential graph", isHighlighted: true, highlightType: "success" },
      { line: 19, text: "        visited.add(curr)", isHighlighted: true, highlightType: "success" },
      { line: 20, text: "        for nxt, weight in graph[curr]:" },
      { line: 21, text: "            if nxt not in visited:" },
      { line: 22, text: "                queue.append(nxt)" },
      { line: 23, text: "                cost += weight" },
      { line: 24, text: "    return cost if len(visited) == nodes else -1" },
    ],
  },
  opponentForensics: {
    language: "Rust 1.76",
    engine: "LLVM 17 Target",
    lockedAt: "05:09 LOCKED",
    attempts: 4,
    passRatio: "37/40 PASS",
    rssMemoryMb: 17.8,
    filename: "main.rs",
    codeLines: [
      { line: 1, text: "use std::collections::VecDeque;" },
      { line: 2, text: "" },
      { line: 3, text: "pub fn find_optimal_route(nodes: usize, packets: &[(usize, usize, i32)]) -> i32 {" },
      { line: 4, text: "    let mut adj = vec![Vec::new(); nodes];" },
      { line: 5, text: "    for &(u, v, w) in packets {" },
      { line: 6, text: "        adj[u].push((v, w));" },
      { line: 7, text: "    }" },
      { line: 8, text: "" },
      { line: 9, text: "    let mut visited = vec![false; nodes];" },
      { line: 10, text: "    let mut queue = VecDeque::new();" },
      { line: 11, text: "    queue.push_back(0);" },
      { line: 12, text: "    let mut cost = 0;" },
      { line: 13, text: "" },
      { line: 14, text: "    // FLAW: Incomplete termination on cyclic zero-weight backlinks" },
      { line: 15, text: "    while let Some(curr) = queue.pop_front() {", isHighlighted: true, highlightType: "failure" },
      { line: 16, text: "        visited[curr] = true;", isHighlighted: true, highlightType: "failure" },
      { line: 17, text: "        for &(nxt, w) in &adj[curr] {", isHighlighted: true, highlightType: "failure" },
      { line: 18, text: "            // Missing visited guard prior to push -> Infinite re-eval on cycle", isHighlighted: true, highlightType: "failure" },
      { line: 19, text: "            queue.push_back(nxt);  // TLE on #28, Wrong Ans #17", isHighlighted: true, highlightType: "failure" },
      { line: 20, text: "            cost += w;" },
      { line: 21, text: "        }" },
      { line: 22, text: "    }" },
      { line: 23, text: "    if visited.iter().all(|&v| v) { cost } else { -1 }" },
      { line: 24, text: "}" },
    ],
  },
  algorithmicDiagnosis:
    "Byteghost leveraged Rust's raw compile performance to gain an 8ms speed advantage in standard non-cyclic runs. However, omission of the visited guard before queue.push_back triggered an uncontrolled queue flood on test inputs with multiple interconnecting loopbacks, yielding Time Limit Exceeded (TLE) on Hidden #28 and Assertion Failure on Hidden #34.",
  visibleTests: [
    {
      id: "TEST_01",
      title: "Standard Acyclic",
      runtime: "12ms",
      input: "nodes=4, packets=[[0,1,2],[1,2,3],[2,3,1]]",
      output: "6 (MATCH)",
      isMatch: true,
    },
    {
      id: "TEST_02",
      title: "Disconnected Node",
      runtime: "14ms",
      input: "nodes=5, packets=[[0,1,1],[1,2,4]]",
      output: "-1 (MATCH)",
      isMatch: true,
    },
    {
      id: "TEST_03",
      title: "Parallel Routes",
      runtime: "11ms",
      input: "nodes=3, packets=[[0,1,5],[0,1,2],[1,2,1]]",
      output: "3 (MATCH)",
      isMatch: true,
    },
  ],
  hiddenSuite: [
    {
      id: "HIDDEN #01 — #16",
      label: "HIDDEN #01 — #16 (Batched)",
      complexityClass: "N <= 500, Scaled Dense",
      playerResult: { status: "PASS", text: "16/16 Passed (Avg 22ms)", runtimeMs: 22 },
      opponentResult: { status: "PASS", text: "16/16 Passed (Avg 19ms)", runtimeMs: 19 },
    },
    {
      id: "HIDDEN #17",
      label: "HIDDEN #17",
      complexityClass: "Self-loop Backlink Cycle",
      playerResult: { status: "PASS", text: "Passed (19ms)", runtimeMs: 19 },
      opponentResult: {
        status: "FAIL",
        text: "WRONG ANSWER (Returned -1, Expected 142)",
      },
      isAnomaly: true,
    },
    {
      id: "HIDDEN #18 — #27",
      label: "HIDDEN #18 — #27 (Batched)",
      complexityClass: "N <= 2,000, Sparse Tree",
      playerResult: { status: "PASS", text: "10/10 Passed (Avg 34ms)", runtimeMs: 34 },
      opponentResult: { status: "PASS", text: "10/10 Passed (Avg 28ms)", runtimeMs: 28 },
    },
    {
      id: "HIDDEN #28",
      label: "HIDDEN #28",
      complexityClass: "Cyclic Dense Mesh N=10k",
      playerResult: { status: "PASS", text: "Passed (81ms Max Peak)", runtimeMs: 81 },
      opponentResult: {
        status: "TLE",
        text: "TIME LIMIT EXCEEDED (> 2,000ms Loop)",
      },
      isAnomaly: true,
    },
    {
      id: "HIDDEN #29 — #33",
      label: "HIDDEN #29 — #33 (Batched)",
      complexityClass: "Negative Edge Weights",
      playerResult: { status: "PASS", text: "5/5 Passed (Avg 41ms)", runtimeMs: 41 },
      opponentResult: { status: "PASS", text: "5/5 Passed (Avg 35ms)", runtimeMs: 35 },
    },
    {
      id: "HIDDEN #34",
      label: "HIDDEN #34",
      complexityClass: "Zero-cost Packet Loop",
      playerResult: { status: "PASS", text: "Passed (28ms)", runtimeMs: 28 },
      opponentResult: {
        status: "PANIC",
        text: "RUNTIME PANIC (Assertion Failed on visit parity)",
      },
      isAnomaly: true,
    },
    {
      id: "HIDDEN #35 — #40",
      label: "HIDDEN #35 — #40 (Batched)",
      complexityClass: "Max Memory Bound Vector",
      playerResult: { status: "PASS", text: "6/6 Passed (Avg 55ms)", runtimeMs: 55 },
      opponentResult: { status: "PASS", text: "6/6 Passed (Avg 46ms)", runtimeMs: 46 },
    },
  ],
  metrics: {
    playerNormalizedRuntime: 81,
    opponentNormalizedRuntime: 73,
    playerMemoryPercent: 65,
    opponentMemoryPercent: 63,
    playerIntegrityPercent: 100,
    opponentIntegrityPercent: 92.5,
    playerAttempts: 3,
    opponentAttempts: 4,
    playerWallClock: "06:46",
    opponentWallClock: "05:09",
    playerAstDepth: 14,
    opponentAstDepth: 18,
  },
  timeline: [
    {
      tick: "00:00.00",
      title: "Match Started",
      description: "Isolated sandbox initialized on cluster node EU-WEST-03",
      badge: "SYS_INITIALIZE",
      actor: "system",
      badgeVariant: "neutral",
    },
    {
      tick: "01:18.42",
      title: "Nano: First Run",
      description: "4/15 visible tests passed (Syntax compile verified)",
      badge: "TEST_BURST",
      actor: "nano",
      badgeVariant: "neutral",
    },
    {
      tick: "01:42.10",
      title: "Byteghost: First Run",
      description: "8/15 visible tests passed in initial rustc binary",
      badge: "OPPONENT_EXEC",
      actor: "opponent",
      badgeVariant: "secondary",
    },
    {
      tick: "02:26.15",
      title: "Byteghost: Run 2",
      description: "10/15 visible tests passed",
      badge: "OPPONENT_EXEC",
      actor: "opponent",
      badgeVariant: "secondary",
    },
    {
      tick: "03:12.80",
      title: "Nano: Run 2",
      description: "8/15 visible tests passed (Refactored to BFS queue)",
      badge: "TEST_BURST",
      actor: "nano",
      badgeVariant: "neutral",
    },
    {
      tick: "04:21.00",
      title: "Nano: Run 3 (Visible Suite Clean)",
      description: "Passed 15/15 visible test scenarios",
      badge: "SUITE_CLEAN",
      actor: "nano",
      badgeVariant: "success",
    },
    {
      tick: "05:09.12",
      title: "Byteghost: Final Submission Locked",
      description: "Dispatched binary for deterministic judging",
      badge: "LOCK_SUBMIT",
      actor: "opponent",
      badgeVariant: "secondary",
    },
    {
      tick: "06:46.44",
      title: "Nano: Final Submission Locked",
      description: "Dispatched with cycle deduplication layer",
      badge: "LOCK_SUBMIT",
      actor: "nano",
      badgeVariant: "volt",
    },
    {
      tick: "06:47.10",
      title: "Deterministic Judging Initiated",
      description: "40 hidden vectors dispatched simultaneously",
      badge: "EVALUATOR",
      actor: "system",
      badgeVariant: "warning",
    },
    {
      tick: "06:49.02",
      title: "Result Ratified & Locked",
      description: "Nano Victory ratified under Rule 4.2 (40/40 vs 37/40)",
      badge: "LEDGER_SEAL",
      actor: "system",
      badgeVariant: "success",
    },
  ],
  eloProgression: {
    currentTier: "Stack Hunter (Tier II)",
    targetTier: "Kernel Tier (1,500 ELO)",
    targetElo: 1500,
    progressPercent: 53.2,
    eloRemaining: 234,
    lastFive: ["W", "W", "L", "W", "W"],
    winProbability: 47.2,
    kFactor: 32,
  },
  drills: [
    {
      id: "drill-1",
      title: "Shortest Signal Route",
      difficulty: "Medium",
      estMinutes: 10,
      description:
        "Bidirectional BFS across cyclical network hubs with dynamic weight resets and barrier nodes.",
      tags: ["Graphs", "BFS / Deque"],
    },
    {
      id: "drill-2",
      title: "Network Relay Protocol",
      difficulty: "Medium",
      estMinutes: 12,
      description:
        "Priority heap Dijkstra optimization preventing redundant cycle revisits in asynchronous relays.",
      tags: ["Dijkstra", "Min-Heap"],
    },
    {
      id: "drill-3",
      title: "Island Routing Matrix",
      difficulty: "Hard",
      estMinutes: 18,
      description:
        "Disjoint set union (DSU) with path compression to calculate connected component bridging latency.",
      tags: ["Union Find", "DSU"],
    },
  ],
};

/**
 * Helper to retrieve a match report by ID, with a rich fallback synthesis for any match in the system.
 */
export function getMatchReportById(id: string): MatchReportDetails {
  if (id === "CC-10482" || !id) {
    return MATCH_REPORT_CC10482;
  }

  // Look up in ALL_MATCHES_DATA
  const record = ALL_MATCHES_DATA.find((m) => m.id.toLowerCase() === id.toLowerCase());

  if (!record) {
    // If unknown id, return default with requested ID
    return {
      ...MATCH_REPORT_CC10482,
      matchId: id,
      hash: `0x${id.toLowerCase().replace(/[^a-f0-9]/g, "")}aa...${id}`,
    };
  }

  const isWin = record.outcome === "WIN";
  const isLoss = record.outcome === "LOSS";

  return {
    ...MATCH_REPORT_CC10482,
    matchId: record.id,
    hash: `0x${record.id.toLowerCase().replace(/[^a-f0-9]/g, "")}fd...${record.id}`,
    targetProblem: {
      id: record.problem.id,
      title: record.problem.title,
      difficulty: record.problem.difficulty,
      topic: record.problem.topic,
    },
    timestamp: record.timestamp,
    duration: record.duration,
    modeLabel: `${record.mode.toUpperCase()} · STANDARD BREACH`,
    player: {
      ...MATCH_REPORT_CC10482.player,
      outcome: record.outcome,
      eloDelta: record.eloDelta,
      testsPassed: record.testsPassed,
      testsTotal: record.testsTotal,
      runtime: record.runtime,
      eloPre: 1250,
      eloPost: 1250 + record.eloDelta,
    },
    opponent: {
      ...MATCH_REPORT_CC10482.opponent,
      name: record.opponent.name,
      outcome: isWin ? "LOSS" : isLoss ? "WIN" : "DRAW",
      eloDelta: -record.eloDelta,
      eloPre: record.opponent.elo,
      eloPost: record.opponent.elo - record.eloDelta,
      testsPassed: isWin ? Math.max(0, record.testsTotal - 3) : record.testsTotal,
      testsTotal: record.testsTotal,
    },
    decidingFactor: {
      clause: isWin ? "CLAUSE 4.2" : "CLAUSE 1.8",
      title: isWin
        ? "DECIDING FACTOR: CORRECTNESS FIRST"
        : "DECIDING FACTOR: RUNTIME LATENCY",
      summary: isWin
        ? `NANO passed the complete ${record.testsPassed}/${record.testsTotal} test suite.`
        : `${record.opponent.name} solved edge constraints faster with optimal memory caching.`,
      analysis: isWin
        ? `Under CodeClash competitive regulations, full suite correctness takes unconditional priority over raw compile or submit speed.`
        : `Execution runtime disparity (+${record.runtime}) settled rating redistribution after test equality was attained.`,
      priorityStack: [
        {
          priority: "01 // DECIDER",
          name: isWin ? "Correctness" : "Runtime Speed",
          status: isWin ? `Nano: ${record.testsPassed}/${record.testsTotal}` : `${record.opponent.name} Lead`,
          highlight: true,
        },
        {
          priority: "02 // BYPASS",
          name: "Runtime",
          status: isWin ? "Not needed" : "Settled",
        },
        {
          priority: "03 // BYPASS",
          name: "Submit Clock",
          status: "Not needed",
        },
      ],
    },
  };
}
