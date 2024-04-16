import { FoodEntity, PreferencesEntity } from "../data/entities";
import { subDays } from "date-fns";
import { getHealthKitData } from "./getHealthKitData";

export type DayInfo = {
  tracked: boolean;
  day: string;
  consumedCalories: number;
  burnedCalories: number;
  activeCalories: number;
  baseCalories: number;
  steps: number;
};
export type StreakInfo = {
  currentStreakDays: number;
  today: DayInfo;
  yesterday: DayInfo;
  twoDaysAgo: DayInfo;
  threeDaysAgo: DayInfo;
  fourDaysAgo: DayInfo;
  fiveDaysAgo: DayInfo;
  sixDaysAgo: DayInfo;
};

export const getDayInfo = async (
  allFoods: FoodEntity[],
  day: Date,
  preferences?: PreferencesEntity,
): Promise<DayInfo> => {
  const healthKitData = await getHealthKitData(day, preferences);
  const dayString = day.toLocaleDateString();
  const tracked = !!allFoods.find((food) => food.day === dayString);
  const consumedCalories = allFoods
    .filter((food) => food.day === dayString)
    .reduce((sum: number, food: FoodEntity) => sum + food.calories, 0);
  const burnedCalories =
    healthKitData.activeCalories + healthKitData.baseCalories;
  const [d, m] = day.toLocaleDateString().split("/");
  return {
    tracked,
    day: [d, m].join("/"),
    consumedCalories,
    burnedCalories,
    steps: healthKitData.steps,
    activeCalories: healthKitData.activeCalories,
    baseCalories: healthKitData.baseCalories,
  };
};
export const getStreakInfo = async (
  allFoods: FoodEntity[],
  today: Date,
  preferences?: PreferencesEntity,
): Promise<StreakInfo> => {
  let currentStreak = 0;
  let tracked = false;
  do {
    const dayToCheck = subDays(today, currentStreak);
    const dayString = dayToCheck.toLocaleDateString();
    tracked = !!allFoods.find((food) => food.day === dayString);
    if (tracked) {
      currentStreak++;
    }
  } while (tracked);

  return {
    currentStreakDays: currentStreak,
    today: await getDayInfo(allFoods, today, preferences),
    yesterday: await getDayInfo(allFoods, subDays(today, 1), preferences),
    twoDaysAgo: await getDayInfo(allFoods, subDays(today, 2), preferences),
    threeDaysAgo: await getDayInfo(allFoods, subDays(today, 3), preferences),
    fourDaysAgo: await getDayInfo(allFoods, subDays(today, 4), preferences),
    fiveDaysAgo: await getDayInfo(allFoods, subDays(today, 5), preferences),
    sixDaysAgo: await getDayInfo(allFoods, subDays(today, 6), preferences),
  };
};
