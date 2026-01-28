import { Capacitor } from "@capacitor/core";
import { HealthKitStats } from "../plugins/HealthKitStats";

type HealthKitData = {
  activeCalories: number;
  baseCalories: number;
  weight: number;
  steps: number;
};

export const getHealthKitData = async (date: Date): Promise<HealthKitData> => {
  if (Capacitor.getPlatform() !== "ios") {
    return { activeCalories: 0, baseCalories: 0, weight: 0, steps: 0 };
  }

  const t0 = performance.now();
  const stats = await HealthKitStats.getDayStats({ date: date.toISOString() });
  console.log(
    `[HK ${date.toLocaleDateString()}] ${(performance.now() - t0).toFixed(0)}ms`,
  );

  return {
    activeCalories: stats.activeCalories,
    baseCalories: stats.baseCalories,
    weight: 0, // Not fetching weight for now
    steps: stats.steps,
  };
};
