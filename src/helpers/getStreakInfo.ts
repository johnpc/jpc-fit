import {
  FoodEntity,
  HealthKitCacheEntity,
  PreferencesEntity,
} from "../data/entities";
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
  currentStreakNetCalories: number;
  today: DayInfo;
  yesterday: DayInfo;
  twoDaysAgo: DayInfo;
  threeDaysAgo: DayInfo;
  fourDaysAgo: DayInfo;
  fiveDaysAgo: DayInfo;
  sixDaysAgo: DayInfo;
  allStreakDays: DayInfo[];
};

export const getDayInfo = async (
  allFoods: FoodEntity[],
  day: Date,
  healthKitCaches: HealthKitCacheEntity[],
  preferences?: PreferencesEntity,
): Promise<DayInfo> => {
  const healthKitData = await getHealthKitData(
    day,
    healthKitCaches,
    preferences,
  );
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
  healthKitCaches: HealthKitCacheEntity[],
  preferences?: PreferencesEntity,
): Promise<StreakInfo> => {
  let currentStreak = 0;
  let currentStreakNetCalories = 0;
  let trackedFoodsOnDay: FoodEntity[] = [];
  let lastCheckedDay = today;
  let itr = 0;
  const allStreakDays: DayInfo[] = [];
  do {
    const dayToCheck = subDays(today, itr);
    lastCheckedDay = dayToCheck;
    const dayString = dayToCheck.toLocaleDateString();
    trackedFoodsOnDay = allFoods.filter((food) => food.day === dayString);
    const dayInfo = await getDayInfo(
      trackedFoodsOnDay,
      dayToCheck,
      healthKitCaches,
      preferences,
    );
    allStreakDays.push(dayInfo);
    currentStreakNetCalories +=
      trackedFoodsOnDay.reduce(
        (sum: number, food: FoodEntity) => sum + food.calories,
        0,
      ) - dayInfo.burnedCalories;
    if (trackedFoodsOnDay.length) {
      currentStreak++;
    }
    itr++;
  } while (
    trackedFoodsOnDay.length ||
    lastCheckedDay.toDateString() === today.toDateString()
  );

  return {
    currentStreakDays: currentStreak,
    currentStreakNetCalories,
    today: await getDayInfo(allFoods, today, healthKitCaches, preferences),
    yesterday: await getDayInfo(
      allFoods,
      subDays(today, 1),
      healthKitCaches,
      preferences,
    ),
    twoDaysAgo: await getDayInfo(
      allFoods,
      subDays(today, 2),
      healthKitCaches,
      preferences,
    ),
    threeDaysAgo: await getDayInfo(
      allFoods,
      subDays(today, 3),
      healthKitCaches,
      preferences,
    ),
    fourDaysAgo: await getDayInfo(
      allFoods,
      subDays(today, 4),
      healthKitCaches,
      preferences,
    ),
    fiveDaysAgo: await getDayInfo(
      allFoods,
      subDays(today, 5),
      healthKitCaches,
      preferences,
    ),
    sixDaysAgo: await getDayInfo(
      allFoods,
      subDays(today, 6),
      healthKitCaches,
      preferences,
    ),
    allStreakDays,
  };
};
