import { Tabs } from "@aws-amplify/ui-react";
import CaloriePage from "./CaloriePage";
import WeightPage from "./WeightPage";
import SettingsPage from "./SettingsPage";
import StatsPage from "./StatsPage";
import { useEffect, useState } from "react";
import {
  FoodEntity,
  GoalEntity,
  PreferencesEntity,
  QuickAddEntity,
  createFoodListener,
  createGoalListener,
  createPreferencesListener,
  createQuickAddListener,
  deleteFoodListener,
  deleteGoalListener,
  deleteQuickAddListener,
  getGoal,
  getPreferences,
  listAllFood,
  listQuickAdds,
  unsubscribeListener,
  updatePreferencesListener,
} from "../data/entities";
import {
  customQuickAdd,
  defaultQuickAdds,
} from "./settings-page/QuickAddConfiguration";

export default function TabsView() {
  const [allFoods, setAllFoods] = useState<FoodEntity[]>([]);
  const [goal, setGoal] = useState<GoalEntity>();
  const [preferences, setPreferences] = useState<PreferencesEntity>();
  const [quickAdds, setQuickAdds] =
    useState<QuickAddEntity[]>(defaultQuickAdds);

  const setupQuickAdds = async () => {
    const quickAdds = await listQuickAdds();
    if (quickAdds.length) {
      setQuickAdds([...quickAdds, customQuickAdd]);
    } else {
      setQuickAdds(defaultQuickAdds);
    }
  };

  useEffect(() => {
    const setup = async () => {
      const allFoods = await listAllFood();
      setAllFoods(allFoods);
      setGoal(await getGoal());
      setPreferences(await getPreferences());
      await setupQuickAdds();
    };
    setup();
    const createFoodSubscription = createFoodListener(async () =>
      setAllFoods(await listAllFood()),
    );
    const deleteFoodSubscription = deleteFoodListener(async () =>
      setAllFoods(await listAllFood()),
    );
    const createGoalSubscription = createGoalListener(async () =>
      setGoal(await getGoal()),
    );
    const deleteGoalSubscription = deleteGoalListener(async () =>
      setGoal(await getGoal()),
    );
    const createQuickAddSubscription = createQuickAddListener(setupQuickAdds);
    const deleteQuickAddSubscription = deleteQuickAddListener(setupQuickAdds);
    const createPreferencesSubscription = createPreferencesListener(async () =>
      setPreferences(await getPreferences()),
    );
    const updatePreferencesSubscription = updatePreferencesListener(async () =>
      setPreferences(await getPreferences()),
    );
    return () => {
      unsubscribeListener(createFoodSubscription);
      unsubscribeListener(deleteFoodSubscription);
      unsubscribeListener(createGoalSubscription);
      unsubscribeListener(deleteGoalSubscription);
      unsubscribeListener(createQuickAddSubscription);
      unsubscribeListener(deleteQuickAddSubscription);
      unsubscribeListener(createPreferencesSubscription);
      unsubscribeListener(updatePreferencesSubscription);
    };
  }, []);

  return (
    <>
      <Tabs
        justifyContent="flex-start"
        defaultValue="Calories"
        items={[
          {
            label: "Calories",
            value: "Calories",
            content: (
              <CaloriePage
                allFoods={allFoods}
                quickAdds={quickAdds}
                goal={goal}
                preferences={preferences}
              />
            ),
          },
          { label: "Weight", value: "Weight", content: <WeightPage /> },
          {
            label: "Stats",
            value: "Stats",
            content: <StatsPage allFoods={allFoods} />,
          },
          {
            label: "Settings",
            value: "Settings",
            content: (
              <SettingsPage preferences={preferences} quickAdds={quickAdds} />
            ),
          },
        ]}
      />
    </>
  );
}
