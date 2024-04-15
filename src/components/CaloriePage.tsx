import {
  FoodEntity,
  GoalEntity,
  PreferencesEntity,
  QuickAddEntity,
} from "../data/entities";
import { CalorieData } from "./calorie-page/CalorieData";

export default function CaloriePage(props: {
  allFoods: FoodEntity[];
  goal?: GoalEntity;
  preferences?: PreferencesEntity;
  quickAdds: QuickAddEntity[];
}) {
  return (
    <>
      <CalorieData {...props} />
    </>
  );
}
