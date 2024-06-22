import { Loader, Tabs } from "@aws-amplify/ui-react";
import { Preferences } from "@capacitor/preferences";
import { WidgetsBridgePlugin } from "capacitor-widgetsbridge-plugin";
import CaloriePage from "./CaloriePage";
import WeightPage from "./WeightPage";
import SettingsPage from "./SettingsPage";
import StatsPage from "./StatsPage";
import { useEffect, useState } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import {
  FoodEntity,
  GoalEntity,
  HeightEntity,
  PreferencesEntity,
  QuickAddEntity,
  WeightEntity,
  createFoodListener,
  createGoalListener,
  createPreferencesListener,
  createQuickAddListener,
  deleteFoodListener,
  deleteGoalListener,
  deleteQuickAddListener,
  getGoal,
  getHeight,
  getPreferences,
  getWeight,
  listAllFood,
  listQuickAdds,
  unsubscribeListener,
  updateFoodListener,
  updatePreferencesListener,
} from "../data/entities";
import {
  customQuickAdd,
  defaultQuickAdds,
} from "./settings-page/QuickAddConfiguration";
import { StreakInfo, getStreakInfo } from "../helpers/getStreakInfo";
import { App } from "@capacitor/app";
import AphorismsPage from "./AphorismsPage";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const setTodaysCaloriesPreferences = async (calories: number) => {
  await Preferences.configure({
    group: "group.com.johncorser.fit.prefs",
  });
  const keys = await Preferences.keys();
  console.log({ keys });
  console.log("TabsView 39");
  await getTodaysCaloriesPreferences();
  console.log("TabsView 41", { calories });
  await Preferences.set({
    key: "consumedCalories",

    value: calories.toString(),
  });
  console.log("TabsView 46");
  await WidgetsBridgePlugin.reloadAllTimelines();
  console.log("TabsView 48");
};

const getTodaysCaloriesPreferences = async () => {
  await Preferences.configure({
    group: "group.com.johncorser.fit.prefs",
  });
  const { value } = await Preferences.get({ key: "consumedCalories" });

  console.log(`Hello ${value}!`);
  return value;
};

export default function TabsView() {
  const [toggleListeners, setToggleListeners] = useState<boolean>(false);
  const [allFoods, setAllFoods] = useState<FoodEntity[]>([]);
  const [goal, setGoal] = useState<GoalEntity>();
  const [height, setHeight] = useState<HeightEntity>();
  const [weight, setWeight] = useState<WeightEntity>();
  const [preferences, setPreferences] = useState<PreferencesEntity>({
    hideProtein: true,
    hideSteps: true,
  });
  const [quickAdds, setQuickAdds] =
    useState<QuickAddEntity[]>(defaultQuickAdds);
  const [streak, setStreak] = useState<StreakInfo>();
  const [lastOpenTime, setLastOpenTime] = useState<Date>();

  const setupQuickAdds = async (existingQuickAdds: QuickAddEntity[]) => {
    const withCustomRemoved = existingQuickAdds.filter(
      (quickAdd) => quickAdd.id !== "dqa-Custom",
    );
    if (withCustomRemoved.length) {
      setQuickAdds([...withCustomRemoved, customQuickAdd]);
    } else {
      setQuickAdds(defaultQuickAdds);
    }
  };
  useEffect(() => {
    CapacitorApp.addListener("resume", () => {
      setLastOpenTime(new Date());
    });
    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    const fetchFood = async () => {
      const allFoods = await listAllFood();
      setAllFoods(allFoods);
    };
    const fetchGoal = async () => {
      setGoal(await getGoal());
    };
    const fetchPreferences = async () => {
      const preferences = await getPreferences();
      setPreferences(preferences);
    };
    const fetchQuickAdds = async () => {
      const existingQuickAdds = await listQuickAdds();
      await setupQuickAdds(existingQuickAdds);
    };
    const fetchHeight = async () => {
      const height = await getHeight();
      setHeight(height);
    };
    const fetchWeight = async () => {
      const weight = await getWeight();
      setWeight(weight);
    };

    const setup = async () => {
      await Promise.all([
        fetchFood(),
        fetchGoal(),
        fetchPreferences(),
        fetchQuickAdds(),
        fetchHeight(),
        fetchWeight(),
      ]);
    };
    setup();
  }, []);

  useEffect(() => {
    const fetchStreak = async () => {
      const streak = await getStreakInfo(allFoods, new Date(), preferences);
      setStreak(streak);
    };
    fetchStreak();
  }, [preferences, allFoods]);

  useEffect(() => {
    const createFoodSubscription = createFoodListener(
      async (food: FoodEntity) => {
        const newAllFoods = [...allFoods, food];
        const todaysCalories = newAllFoods
          .filter((food) => food.day === new Date().toLocaleDateString())
          .reduce((acc, food) => acc + food.calories, 0);
        setTodaysCaloriesPreferences(todaysCalories);
        setAllFoods(newAllFoods);
        const streak = await getStreakInfo(
          newAllFoods,
          new Date(),
          preferences,
        );
        setStreak(streak);
      },
    );
    const updateFoodSubscription = updateFoodListener(
      async (food: FoodEntity) => {
        const newAllFoods = allFoods.map((f) => (f.id === food.id ? food : f));
        setAllFoods(newAllFoods);
        const todaysCalories = newAllFoods
          .filter((food) => food.day === new Date().toLocaleDateString())
          .reduce((acc, food) => acc + food.calories, 0);
        setTodaysCaloriesPreferences(todaysCalories);
      },
    );
    const deleteFoodSubscription = deleteFoodListener(
      async (deletedFood: FoodEntity) => {
        const newAllFoods = allFoods.filter(
          (food) => food.id !== deletedFood.id,
        );
        setAllFoods(newAllFoods);
        const streak = await getStreakInfo(
          newAllFoods,
          new Date(),
          preferences,
        );
        setStreak(streak);
      },
    );
    const createGoalSubscription = createGoalListener(
      async (goal: GoalEntity) => setGoal(goal),
    );
    const deleteGoalSubscription = deleteGoalListener(async () =>
      setGoal(undefined),
    );
    const createQuickAddSubscription = createQuickAddListener(
      (createdQuickAdd: QuickAddEntity) => {
        const isDefault = !!quickAdds.find((quickAdd) =>
          quickAdd.id.startsWith("dqa-100"),
        );
        if (isDefault) {
          setupQuickAdds([createdQuickAdd]);
        } else {
          const updatedQuickAdds = [...quickAdds, createdQuickAdd];
          setupQuickAdds(updatedQuickAdds);
        }
      },
    );
    const deleteQuickAddSubscription = deleteQuickAddListener(
      (deletedQuickAdd: QuickAddEntity) => {
        const updatedQuickAdds = quickAdds.filter(
          (quickAdd) => quickAdd.id !== deletedQuickAdd.id,
        );
        setupQuickAdds(updatedQuickAdds);
      },
    );
    const createPreferencesSubscription = createPreferencesListener(
      async (preferences: PreferencesEntity) => {
        setPreferences(preferences);
        const streak = await getStreakInfo(allFoods, new Date(), preferences);
        setStreak(streak);
      },
    );
    const updatePreferencesSubscription = updatePreferencesListener(
      async (preferences: PreferencesEntity) => {
        setPreferences(preferences);
        const streak = await getStreakInfo(allFoods, new Date(), preferences);
        setStreak(streak);
      },
    );
    App.addListener("appStateChange", async ({ isActive }) => {
      if (isActive) {
        const streak = await getStreakInfo(allFoods, new Date(), preferences);
        setStreak(streak);
        setToggleListeners(!toggleListeners);
      }
    });
    return () => {
      unsubscribeListener(createFoodSubscription);
      unsubscribeListener(updateFoodSubscription);
      unsubscribeListener(deleteFoodSubscription);
      unsubscribeListener(createGoalSubscription);
      unsubscribeListener(deleteGoalSubscription);
      unsubscribeListener(createQuickAddSubscription);
      unsubscribeListener(deleteQuickAddSubscription);
      unsubscribeListener(createPreferencesSubscription);
      unsubscribeListener(updatePreferencesSubscription);
      App.removeAllListeners();
    };
  }, [allFoods, preferences, quickAdds, toggleListeners, lastOpenTime]);

  if (!streak) return <Loader variation="linear" />;
  const todaysCalories = allFoods
    .filter((food) => food.day === new Date().toLocaleDateString())
    .reduce((acc, food) => acc + food.calories, 0);
  setTodaysCaloriesPreferences(todaysCalories);

  return (
    <>
      <Tabs
        justifyContent="flex-start"
        spacing="equal"
        defaultValue="Calories"
        items={[
          {
            label: "Today",
            value: "Calories",
            content: (
              <CaloriePage
                allFoods={allFoods}
                quickAdds={quickAdds}
                goal={goal}
                preferences={preferences}
                streakInfo={streak}
                dayInfo={streak.today}
              />
            ),
          },
          {
            label: "Weight",
            value: "Weight",
            content: (
              <WeightPage
                preferences={preferences}
                height={height}
                weight={weight}
              />
            ),
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
            label: "Quotes",
            value: "Aphorisms",
            content: <AphorismsPage />,
          },
          {
            label: <ManageAccountsIcon />,
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
