import {
  FoodEntity,
  HealthKitCacheEntity,
  PreferencesEntity,
} from "../data/entities";
import { StreakInfo } from "../helpers/getStreakInfo";
import Streak from "./stats-page/Streak";
import WeeklyOverview from "./stats-page/WeeklyOverview";

export default function StatsPage(props: {
  allFoods: FoodEntity[];
  streakInfo: StreakInfo;
  preferences: PreferencesEntity;
  healthKitCaches: HealthKitCacheEntity[];
}) {
  return (
    <>
      <Streak {...props} />
      <WeeklyOverview {...props} />
    </>
  );
}
