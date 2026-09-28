export interface LanguageOption {
  id: string;
  name: string;
  version: string;
  compiler: string;
  tag: string;
  tagType?: "success" | "neutral";
  baseMem: string;
}

export interface LoadoutConfig {
  selectedLangs: string[];
  primaryLang: string;
}

export interface CalibrationOption {
  id: string;
  tag: string;
  title: string;
  description: string;
  footerTag: string;
}

export interface MissionOption {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  tag: string;
  meta: string;
}

export interface TelemetryProfile {
  handle: string;
  avatarSrc: string;
  avatarHash: string;
  primaryLang: string;
  primaryRuntime: string;
  experience: string;
  mission: string;
  uid: string;
  ping: string;
  cluster: string;
  ratingTier: string;
  placementsDone: number;
  placementsTotal: number;
}
