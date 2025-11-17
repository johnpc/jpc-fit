import { Capacitor } from "@capacitor/core";
import {
  CapacitorHealthkit,
  OtherData,
  QueryOutput,
  SampleNames,
} from "@perfood/capacitor-healthkit";
import { endOfDay, startOfDay } from "date-fns";

type HealthKitData = {
  activeCalories: number;
  baseCalories: number;
  weight: number;
  steps: number;
};

const aggregateHealthData = (data: QueryOutput<OtherData>) => {
  const hasAppleWatch = data.resultData.find(
    (result) => result.device?.name === "Apple Watch",
  );

  const sum = data.resultData
    .filter((result) =>
      hasAppleWatch
        ? result.device?.name === "Apple Watch"
        : result.device?.name === "iPhone",
    )
    .filter((result) => result.sourceBundleId.includes("com.apple.health"))
    .reduce((value, item) => (value += item.value), 0);
  return sum;
};

export const getHealthKitData = async (date: Date): Promise<HealthKitData> => {
  if (Capacitor.getPlatform() !== "ios") {
    return { activeCalories: 0, baseCalories: 0, weight: 0, steps: 0 };
  }

  const startDate = startOfDay(date).toISOString();
  const endDate = endOfDay(date).toISOString();
  const queryOptions = { startDate, endDate, limit: 0 };

  const [activeCalorieData, baseCalorieData, weightData, stepsData] =
    await Promise.all([
      CapacitorHealthkit.queryHKitSampleType<OtherData>({
        ...queryOptions,
        sampleName: SampleNames.ACTIVE_ENERGY_BURNED,
      }),
      CapacitorHealthkit.queryHKitSampleType<OtherData>({
        ...queryOptions,
        sampleName: SampleNames.BASAL_ENERGY_BURNED,
      }),
      CapacitorHealthkit.queryHKitSampleType<OtherData>({
        ...queryOptions,
        sampleName: SampleNames.WEIGHT,
      }),
      CapacitorHealthkit.queryHKitSampleType<OtherData>({
        ...queryOptions,
        sampleName: SampleNames.STEP_COUNT,
      }),
    ]);

  return {
    activeCalories: +aggregateHealthData(activeCalorieData).toFixed(),
    baseCalories: +aggregateHealthData(baseCalorieData).toFixed(),
    weight: +aggregateHealthData(weightData).toFixed(),
    steps: +aggregateHealthData(stepsData).toFixed(),
  };
};
