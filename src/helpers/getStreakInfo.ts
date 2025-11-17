import { FoodEntity } from "../lib/types";
import { subDays } from "date-fns";

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

export const getStreakInfo = (allFoods: FoodEntity[]): StreakInfo => {
  const today = new Date();
  const daysToProcess: Date[] = [];
  for (let i = 0; i < 7; i++) {
    daysToProcess.push(subDays(today, i));
  }

  const allDayInfos = daysToProcess.map((day) => {
    const dayString = day.toLocaleDateString();
    const trackedFoodsOnDay = allFoods.filter((food) => food.day === dayString);
    const tracked = trackedFoodsOnDay.length > 0;
    const consumedCalories = trackedFoodsOnDay.reduce(
      (sum, food) => sum + food.calories,
      0,
    );
    const [d, m] = day.toLocaleDateString().split("/");

    return {
      tracked,
      day: [d, m].join("/"),
      dateString: dayString,
      consumedCalories,
      burnedCalories: 0,
      activeCalories: 0,
      baseCalories: 0,
      steps: 0,
      netCalories: consumedCalories,
    };
  });

  allDayInfos.sort(
    (a, b) =>
      new Date(b.dateString).getTime() - new Date(a.dateString).getTime(),
  );

  let currentStreakDays = 0;
  let currentStreakNetCalories = 0;

  for (const dayInfo of allDayInfos) {
    if (dayInfo.tracked) {
      currentStreakDays++;
      currentStreakNetCalories += dayInfo.netCalories;
    } else {
      break;
    }
  }

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

  return {
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
};
