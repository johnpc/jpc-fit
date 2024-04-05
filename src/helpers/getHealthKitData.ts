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
};

const isIos = () => {
  return Capacitor.getPlatform() === "ios";
};

export const hasPermission = async (): Promise<boolean> => {
  if (!isIos()) {
    return true;
  }

  const { activeCalories, baseCalories, weight } = await getHealthKitData();
  const noData = activeCalories === 0 && baseCalories === 0 && weight === 0;
  console.log({
    fn: "hasPermission",
    activeCalories,
    baseCalories,
    weight,
    noData,
  });
  return !noData;
};

export const getHealthKitData = async (): Promise<HealthKitData> => {
  if (!isIos()) {
    return {
      activeCalories: 250,
      baseCalories: 1500,
      weight: 150,
    };
  }

  const today = new Date();
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

  return {
    activeCalories: +activeCalorieValue.toFixed(),
    baseCalories: +baseCalorieValue.toFixed(),
    weight: +weightValue.toFixed(),
  };
};
