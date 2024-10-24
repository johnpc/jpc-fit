import {
  FoodEntity,
  HealthKitCacheEntity,
  PreferencesEntity,
} from "../data/entities";
import { subDays } from "date-fns";
import { getHealthKitData } from "./getHealthKitData";
import { getCache, setCache, STREAK_KEY } from "../data/cache";

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
  const cachedStreak: DayInfo[] = getCache(STREAK_KEY)
    ? JSON.parse(getCache(STREAK_KEY)!)
    : [];

  const daysToCheck: Date[] = [];

  const foodDays = new Set(allFoods.map((food) => food.day));
  let day = today;
  let dayString = day.toLocaleDateString();

  let itr = 0;
  do {
    day = subDays(today, itr);
    dayString = day.toLocaleDateString();
    const cachedDay = cachedStreak.find(
      (d) => d.dateString === day.toLocaleDateString(),
    );
    console.log({ cachedDay, foodDays, dayString });
    if ((!cachedDay && foodDays.has(dayString)) || itr === 0) {
      daysToCheck.push(day);
    }
    itr++;
  } while (foodDays.has(dayString) || itr === 1);
  const dayInfoPromises = daysToCheck.map(async (dayToCheck) => {
    const dayString = dayToCheck.toLocaleDateString();
    const trackedFoodsOnDay = allFoods.filter((food) => food.day === dayString);
    const dayInfo = await getDayInfo(
      trackedFoodsOnDay,
      dayToCheck,
      healthKitCaches,
      preferences,
    );
    return dayInfo;
  });
  const allStreakDays = [
    ...(await Promise.all(dayInfoPromises)),
    ...cachedStreak,
  ];
  setCache(STREAK_KEY, JSON.stringify(allStreakDays));

  const streakInfo = {
    currentStreakDays: allStreakDays.length,
    currentStreakNetCalories: allStreakDays.reduce(
      (acc, dayInfo) => acc + dayInfo.netCalories,
      0,
    ),
    today: allStreakDays.find(
      (dayInfo) => dayInfo.dateString === today.toLocaleDateString(),
    )!,
    yesterday: allStreakDays.find(
      (dayInfo) =>
        dayInfo.dateString === subDays(today, 1).toLocaleDateString(),
    )!,
    twoDaysAgo: allStreakDays.find(
      (dayInfo) =>
        dayInfo.dateString === subDays(today, 2).toLocaleDateString(),
    )!,
    threeDaysAgo: allStreakDays.find(
      (dayInfo) =>
        dayInfo.dateString === subDays(today, 3).toLocaleDateString(),
    )!,
    fourDaysAgo: allStreakDays.find(
      (dayInfo) =>
        dayInfo.dateString === subDays(today, 4).toLocaleDateString(),
    )!,
    fiveDaysAgo: allStreakDays.find(
      (dayInfo) =>
        dayInfo.dateString === subDays(today, 5).toLocaleDateString(),
    )!,
    sixDaysAgo: allStreakDays.find(
      (dayInfo) =>
        dayInfo.dateString === subDays(today, 6).toLocaleDateString(),
    )!,
    allStreakDays,
  };
  console.log({ streakInfo });
  return streakInfo;
};
