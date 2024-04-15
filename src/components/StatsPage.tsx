import { FoodEntity } from "../data/entities";
import Streak from "./stats-page/Streak";
import WeeklyOverview from "./stats-page/WeeklyOverview";

export default function StatsPage(props: { allFoods: FoodEntity[] }) {
  return (
    <>
      <Streak {...props} />
      <WeeklyOverview {...props} />
    </>
  );
}
