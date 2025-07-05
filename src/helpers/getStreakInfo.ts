import {
  FoodEntity,
  HealthKitCacheEntity,
  PreferencesEntity,
} from "../data/entities";
import { subDays } from "date-fns";
import { getHealthKitData } from "./getHealthKitData";
import { getCache, setCache } from "../data/cache";

export type DayInfo = {
  tracked: boolean;
  day: string;
  dateString: string;
  consumedCalories: number;
  burnedCalories: number;
  activeCalories: number;
  baseCalories: number;
  steps: number;
  netCalories: number;
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
  const dayInfoCacheKey = `dayinfo-${allFoods.length}-${day.getTime()}`;
  const stored = getCache(dayInfoCacheKey);
  if (stored) {
    return JSON.parse(stored);
  }

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
  const dayInfo = {
    tracked,
    day: [d, m].join("/"),
    consumedCalories,
    burnedCalories,
    steps: healthKitData.steps,
    activeCalories: healthKitData.activeCalories,
    baseCalories: healthKitData.baseCalories,
    dateString: dayString,
    netCalories: consumedCalories - burnedCalories,
  };
  if (day.toLocaleDateString() != new Date().toLocaleDateString()) {
    setCache(dayInfoCacheKey, JSON.stringify(dayInfo));
  }
  return dayInfo;
};
export const getStreakInfo = async (
  allFoods: FoodEntity[],
  today: Date,
  healthKitCaches: HealthKitCacheEntity[],
  preferences?: PreferencesEntity,
): Promise<StreakInfo> => {
  console.log({ allFoods });

  // Get all unique days that need day info (last 7 days for the UI)
  const daysToProcess: Date[] = [];
  for (let i = 0; i < 7; i++) {
    daysToProcess.push(subDays(today, i));
  }

  // Get day info for all days we need
  const dayInfoPromises = daysToProcess.map(async (day) => {
    const dayString = day.toLocaleDateString();
    const trackedFoodsOnDay = allFoods.filter((food) => food.day === dayString);
    const dayInfo = await getDayInfo(
      trackedFoodsOnDay,
      day,
      healthKitCaches,
      preferences,
    );
    return dayInfo;
  });

  const allDayInfos = await Promise.all(dayInfoPromises);

  // Sort by date (most recent first)
  allDayInfos.sort(
    (a, b) =>
      new Date(b.dateString).getTime() - new Date(a.dateString).getTime(),
  );

  // Calculate current streak by counting consecutive tracked days from today backwards
  let currentStreakDays = 0;
  let currentStreakNetCalories = 0;

  for (const dayInfo of allDayInfos) {
    if (dayInfo.tracked) {
      currentStreakDays++;
      currentStreakNetCalories += dayInfo.netCalories;
    } else {
      // Break the streak if we hit an untracked day
      break;
    }
  }

  // Find specific days for the UI
  const findDayInfo = (daysBack: number): DayInfo => {
    const targetDate = subDays(today, daysBack).toLocaleDateString();
    return (
      allDayInfos.find((dayInfo) => dayInfo.dateString === targetDate) || {
        tracked: false,
        day: subDays(today, daysBack)
          .toLocaleDateString()
          .split("/")
          .slice(0, 2)
          .join("/"),
        dateString: targetDate,
        consumedCalories: 0,
        burnedCalories: 0,
        activeCalories: 0,
        baseCalories: 0,
        steps: 0,
        netCalories: 0,
      }
    );
  };

  const streakInfo = {
    currentStreakDays,
    currentStreakNetCalories,
    today: findDayInfo(0),
    yesterday: findDayInfo(1),
    twoDaysAgo: findDayInfo(2),
    threeDaysAgo: findDayInfo(3),
    fourDaysAgo: findDayInfo(4),
    fiveDaysAgo: findDayInfo(5),
    sixDaysAgo: findDayInfo(6),
    allStreakDays: allDayInfos.filter((day) => day.tracked),
  };

  console.log({ streakInfo });
  return streakInfo;
};
