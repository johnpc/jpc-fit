import { FoodEntity } from "../data/entities";
import { subDays } from "date-fns";
import { getHealthKitData } from "./getHealthKitData";

export type DayInfo = {
  tracked: boolean;
  day: string;
  consumedCalories: number;
  burnedCalories: number;
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
export const getStreakInfo = async (
  allFoods: FoodEntity[],
  today: Date,
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

  const getDayInfo = async (day: Date): Promise<DayInfo> => {
    const healthKitData = await getHealthKitData(day);
    const dayString = day.toLocaleDateString();
    const tracked = !!allFoods.find((food) => food.day === dayString);
    const consumedCalories = allFoods
      .filter((food) => food.day === dayString)
      .reduce((sum: number, food: FoodEntity) => sum + food.calories, 0);
    const burnedCalories =
      healthKitData.activeCalories + healthKitData.baseCalories;
    const [d, m] = day.toLocaleDateString().split("/");
    return { tracked, day: [d, m].join("/"), consumedCalories, burnedCalories };
  };

  return {
    currentStreakDays: currentStreak,
    today: await getDayInfo(today),
    yesterday: await getDayInfo(subDays(today, 1)),
    twoDaysAgo: await getDayInfo(subDays(today, 2)),
    threeDaysAgo: await getDayInfo(subDays(today, 3)),
    fourDaysAgo: await getDayInfo(subDays(today, 4)),
    fiveDaysAgo: await getDayInfo(subDays(today, 5)),
    sixDaysAgo: await getDayInfo(subDays(today, 6)),
  };
};
