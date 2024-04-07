import { listAllFood } from "../data/entities";
import { subDays } from "date-fns";

export type StreakInfo = {
  currentStreakDays: number;
  today: { tracked: boolean; day: string };
  yesterday: { tracked: boolean; day: string };
  twoDaysAgo: { tracked: boolean; day: string };
  threeDaysAgo: { tracked: boolean; day: string };
  fourDaysAgo: { tracked: boolean; day: string };
  fiveDaysAgo: { tracked: boolean; day: string };
  sixDaysAgo: { tracked: boolean; day: string };
};
export const getStreakInfo = async (): Promise<StreakInfo> => {
  const allFoods = await listAllFood();
  const today = new Date();

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

  const info = {
    currentStreakDays: currentStreak,
    today: { tracked: false, day: "" },
    yesterday: { tracked: false, day: "" },
    twoDaysAgo: { tracked: false, day: "" },
    threeDaysAgo: { tracked: false, day: "" },
    fourDaysAgo: { tracked: false, day: "" },
    fiveDaysAgo: { tracked: false, day: "" },
    sixDaysAgo: { tracked: false, day: "" },
  };

  [
    "today",
    "yesterday",
    "twoDaysAgo",
    "threeDaysAgo",
    "fourDaysAgo",
    "fiveDaysAgo",
    "sixDaysAgo",
  ].forEach((key: string, index: number) => {
    const day = subDays(today, index);
    const dayString = day.toLocaleDateString();
    const tracked = !!allFoods.find((food) => food.day === dayString);
    const [d, m] = day.toLocaleDateString().split("/");
    // @ts-expect-error info is all
    info[key] = { tracked, day: [d, m].join("/") };
  });

  return info;
};
