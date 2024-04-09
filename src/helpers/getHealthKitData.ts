import { Capacitor } from "@capacitor/core";
import {
  CapacitorHealthkit,
  OtherData,
  SampleNames,
} from "@perfood/capacitor-healthkit";
import { endOfDay, startOfDay } from "date-fns";

type HealthKitData = {
  activeCalories: number;
  baseCalories: number;
  weight: number;
  steps: number;
};

const isIos = () => {
  return Capacitor.getPlatform() === "ios";
};

export const hasPermission = async (): Promise<boolean> => {
  if (!isIos()) {
    return true;
  }

  return localStorage.getItem("hasPermission") === "hasPermission";
};

export const getHealthKitData = async (today: Date): Promise<HealthKitData> => {
  const defaultHealthKitData = {
    activeCalories: 250,
    baseCalories: 1500,
    weight: 150,
    steps: 0,
  };
  if (!isIos()) {
    return defaultHealthKitData;
  }

  const startDate = startOfDay(today).toISOString();
  const endDate = endOfDay(today).toISOString();
  const queryOptions = {
    startDate,
    endDate,
    limit: 0,
  };
  const activeCalorieData =
    await CapacitorHealthkit.queryHKitSampleType<OtherData>({
      ...queryOptions,
      sampleName: SampleNames.ACTIVE_ENERGY_BURNED,
    });
  const activeCalorieValue = activeCalorieData.resultData.reduce(
    (value, item) => (value += item.value),
    0,
  );
  const baseCalorieData =
    await CapacitorHealthkit.queryHKitSampleType<OtherData>({
      ...queryOptions,
      sampleName: SampleNames.BASAL_ENERGY_BURNED,
    });

  const baseCalorieValue = baseCalorieData.resultData.reduce(
    (value, item) => (value += item.value),
    0,
  );
  const weightData = await CapacitorHealthkit.queryHKitSampleType<OtherData>({
    ...queryOptions,
    sampleName: SampleNames.WEIGHT,
  });
  const weightValue = weightData.resultData.reduce(
    (value, item) => (value += item.value),
    0,
  );

  const stepsData = await CapacitorHealthkit.queryHKitSampleType<OtherData>({
    ...queryOptions,
    sampleName: SampleNames.STEP_COUNT,
  });
  const hasAppleWatch = stepsData.resultData.find(
    (result) => result.device?.name === "Apple Watch",
  );

  const stepsValue = stepsData.resultData
    .filter((result) =>
      hasAppleWatch
        ? result.device?.name === "Apple Watch"
        : result.device?.name === "iPhone",
    )
    .reduce((value, item) => (value += item.value), 0);

  const calculatedHealthKitData = {
    activeCalories: +activeCalorieValue.toFixed(),
    baseCalories: +baseCalorieValue.toFixed(),
    weight: +weightValue.toFixed(),
    steps: +stepsValue.toFixed(),
  };

  if (
    calculatedHealthKitData.activeCalories === 0 &&
    calculatedHealthKitData.baseCalories === 0 &&
    calculatedHealthKitData.weight === 0 &&
    calculatedHealthKitData.steps === 0
  ) {
    return defaultHealthKitData;
  }

  return calculatedHealthKitData;
};
