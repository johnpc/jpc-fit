import { registerPlugin } from "@capacitor/core";

export interface DayStats {
  activeCalories: number;
  baseCalories: number;
  steps: number;
}

export interface HealthKitStatsPlugin {
  getDayStats(options: { date: string }): Promise<DayStats>;
}

export const HealthKitStats =
  registerPlugin<HealthKitStatsPlugin>("HealthKitStats");
