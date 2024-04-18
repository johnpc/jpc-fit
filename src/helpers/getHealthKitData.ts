import { Capacitor } from "@capacitor/core";
import {
  CapacitorHealthkit,
  OtherData,
  QueryOutput,
  SampleNames,
} from "@perfood/capacitor-healthkit";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { PreferencesEntity } from "../data/entities";

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

export const getHealthKitData = async (
  today: Date,
  preferences?: PreferencesEntity,
): Promise<HealthKitData> => {
  const defaultHealthKitData = {
    activeCalories: 250,
    baseCalories: 1500,
    weight: 150,
    steps: 0,
  };
  if (!isIos()) {
    return defaultHealthKitData;
  }

  const localStorageCacheKey = `hkData-${today.toLocaleDateString()}`;
  const storedHKData = localStorage.getItem(localStorageCacheKey);
  if (storedHKData) {
    console.log(`Cache hit for ${today.toLocaleDateString()}`);
    return JSON.parse(storedHKData);
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

  const activeCalorieValue = aggregateHealthData(activeCalorieData);

  const baseCalorieData =
    await CapacitorHealthkit.queryHKitSampleType<OtherData>({
      ...queryOptions,
      sampleName: SampleNames.BASAL_ENERGY_BURNED,
    });

  const baseCalorieValue = aggregateHealthData(baseCalorieData);

  const weightData = await CapacitorHealthkit.queryHKitSampleType<OtherData>({
    ...queryOptions,
    sampleName: SampleNames.WEIGHT,
  });

  const weightValue = aggregateHealthData(weightData);

  const stepsData = preferences?.hideSteps
    ? { resultData: [] }
    : await CapacitorHealthkit.queryHKitSampleType<OtherData>({
        ...queryOptions,
        sampleName: SampleNames.STEP_COUNT,
      });

  const stepsValue = aggregateHealthData(stepsData as QueryOutput<OtherData>);

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
    if (today.getTime() < endOfDay(subDays(new Date(), 1)).getTime()) {
      localStorage.setItem(
        localStorageCacheKey,
        JSON.stringify(defaultHealthKitData),
      );
    }
    return defaultHealthKitData;
  }

  if (today.getTime() < endOfDay(subDays(new Date(), 1)).getTime()) {
    console.log(`updated cache for ${today.toLocaleDateString()}`);
    localStorage.setItem(
      localStorageCacheKey,
      JSON.stringify(calculatedHealthKitData),
    );
  }
  return calculatedHealthKitData;
};
