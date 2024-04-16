import { Loader, Tabs } from "@aws-amplify/ui-react";
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
import { StreakInfo, getStreakInfo } from "../helpers/getStreakInfo";
import { App } from "@capacitor/app";

export default function TabsView() {
  const [allFoods, setAllFoods] = useState<FoodEntity[]>([]);
  const [goal, setGoal] = useState<GoalEntity>();
  const [preferences, setPreferences] = useState<PreferencesEntity>({
    hideProtein: true,
    hideSteps: true,
  });
  const [quickAdds, setQuickAdds] =
    useState<QuickAddEntity[]>(defaultQuickAdds);
  const [streak, setStreak] = useState<StreakInfo>();

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
      const start = Date.now();
      const allFoods = await listAllFood();
      setAllFoods(allFoods);
      const gotFoodsTime = Date.now();
      const gotAllFoods = gotFoodsTime - start;
      setGoal(await getGoal());
      const gotGoalTime = Date.now();
      const gotGoal = gotGoalTime - start - gotAllFoods;
      setPreferences(await getPreferences());
      const gotPreferencesTime = Date.now();
      const gotPreferences = gotPreferencesTime - start - gotGoal;
      await setupQuickAdds();
      const gotQuickAddsTime = Date.now();
      const gotQuickAdds = gotQuickAddsTime - start - gotPreferences;
      const streak = await getStreakInfo(allFoods, new Date(), preferences);
      setStreak(streak);
      const gotStreakTime = Date.now();
      const gotStreak = gotStreakTime - start - gotQuickAdds;
      console.log({
        gotAllFoods,
        gotGoal,
        gotPreferences,
        gotQuickAdds,
        gotStreak,
      });
    };
    setup();
    const createFoodSubscription = createFoodListener(async () => {
      setAllFoods(await listAllFood());
    });
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
    const createPreferencesSubscription = createPreferencesListener(
      async () => {
        const allFoods = await listAllFood();
        setAllFoods(allFoods);
        const preferences = await getPreferences();
        setPreferences(preferences);
        const streak = await getStreakInfo(allFoods, new Date(), preferences);
        setStreak(streak);
      },
    );
    const updatePreferencesSubscription = updatePreferencesListener(
      async () => {
        const allFoods = await listAllFood();
        setAllFoods(allFoods);
        const preferences = await getPreferences();
        setPreferences(preferences);
        const streak = await getStreakInfo(allFoods, new Date(), preferences);
        setStreak(streak);
      },
    );
    App.addListener("appStateChange", async ({ isActive }) => {
      if (isActive) {
        const allFoods = await listAllFood();
        setAllFoods(allFoods);
        const streak = await getStreakInfo(allFoods, new Date(), preferences);
        setStreak(streak);
      }
    });
    return () => {
      unsubscribeListener(createFoodSubscription);
      unsubscribeListener(deleteFoodSubscription);
      unsubscribeListener(createGoalSubscription);
      unsubscribeListener(deleteGoalSubscription);
      unsubscribeListener(createQuickAddSubscription);
      unsubscribeListener(deleteQuickAddSubscription);
      unsubscribeListener(createPreferencesSubscription);
      unsubscribeListener(updatePreferencesSubscription);
      App.removeAllListeners();
    };
  }, []);

  if (!streak) return <Loader variation="linear" />;
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
                streakInfo={streak}
              />
            ),
          },
          {
            label: "Weight",
            value: "Weight",
            content: <WeightPage preferences={preferences} />,
          },
          {
            label: "Stats",
            value: "Stats",
            content: (
              <StatsPage
                allFoods={allFoods}
                streakInfo={streak}
                preferences={preferences}
              />
            ),
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
