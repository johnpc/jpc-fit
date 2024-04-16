import {
  FoodEntity,
  GoalEntity,
  PreferencesEntity,
  QuickAddEntity,
} from "../data/entities";
import { StreakInfo } from "../helpers/getStreakInfo";
import { CalorieData } from "./calorie-page/CalorieData";

export default function CaloriePage(props: {
  allFoods: FoodEntity[];
  goal?: GoalEntity;
  preferences?: PreferencesEntity;
  quickAdds: QuickAddEntity[];
  streakInfo: StreakInfo;
}) {
  return (
    <>
      <CalorieData {...props} />
    </>
  );
}
