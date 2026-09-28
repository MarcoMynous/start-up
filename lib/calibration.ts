import { CalibrationOption } from "./types";

export const CALIBRATION_OPTIONS: CalibrationOption[] = [
  {
    id: "new-blood",
    tag: "APPRENTICE",
    title: "NEW BLOOD",
    description: "I can code, but I'm new to algorithm competitions.",
    footerTag: "GUIDED PROTOCOLS",
  },
  {
    id: "problem-solver",
    tag: "TACTICAL FOCUS",
    title: "PROBLEM SOLVER",
    description: "I regularly solve LeetCode / HackerRank-style problems.",
    footerTag: "BALANCED PACING",
  },
  {
    id: "contest-regular",
    tag: "TIMED RUNS",
    title: "CONTEST REGULAR",
    description: "I've competed in timed programming challenges before.",
    footerTag: "EXPEDITED ENTRY",
  },
  {
    id: "competitive",
    tag: "HIGH STAKES",
    title: "COMPETITIVE",
    description: "I'm comfortable with advanced algorithms and contest strategy.",
    footerTag: "FULL INTENSITY",
  },
];
