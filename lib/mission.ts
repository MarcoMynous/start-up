import { MissionOption } from "./types";

export const MISSION_OPTIONS: MissionOption[] = [
  {
    id: "compete",
    icon: "swords",
    iconColor: "#E4FF3F",
    title: "COMPETE",
    description: "Climb the ranked ladder and face other developers.",
    tag: "RANKED FOCUS",
    meta: "1v1 / FFA",
  },
  {
    id: "interview",
    icon: "terminal",
    iconColor: "#22D3EE",
    title: "INTERVIEW PREP",
    description: "Sharpen algorithms and problem-solving under pressure.",
    tag: "TECHNICAL INTERVIEW",
    meta: "DS & ALGO",
  },
  {
    id: "practice",
    icon: "model_training",
    iconColor: "#F59E0B",
    title: "PRACTICE",
    description: "Improve consistently without rating pressure.",
    tag: "DELIBERATE TRAINING",
    meta: "SOLO / LAB",
  },
  {
    id: "events",
    icon: "trophy",
    iconColor: "#22C55E",
    title: "EVENTS",
    description: "Join tournaments, squads and community competitions.",
    tag: "SQUAD / BREACH",
    meta: "TOURNAMENT",
  },
];
