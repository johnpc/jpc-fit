import {
  FoodEntity,
  GoalEntity,
  HealthKitCacheEntity,
  PreferencesEntity,
  QuickAddEntity,
} from "../data/entities";
import { DayInfo, StreakInfo } from "../helpers/getStreakInfo";
import { CalorieData } from "./calorie-page/CalorieData";

export default function CaloriePage(props: {
  allFoods: FoodEntity[];
  goal?: GoalEntity;
  preferences?: PreferencesEntity;
  quickAdds: QuickAddEntity[];
  streakInfo: StreakInfo;
  dayInfo: DayInfo;
  healthKitCaches: HealthKitCacheEntity[];
  onAdd: (food: FoodEntity) => void;
  onRemove: (food: FoodEntity) => void;
}) {
  return (
    <>
      <CalorieData {...props} />
    </>
  );
}
