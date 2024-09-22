import { Loader, Tabs } from "@aws-amplify/ui-react";
import { WidgetsBridgePlugin } from "capacitor-widgetsbridge-plugin";
import CaloriePage from "./CaloriePage";
import WeightPage from "./WeightPage";
import SettingsPage from "./SettingsPage";
import ChatPage from "./ChatPage";
import StatsPage from "./StatsPage";
import { useEffect, useState } from "react";
import {
  FoodEntity,
  GoalEntity,
  HealthKitCacheEntity,
  HeightEntity,
  PreferencesEntity,
  QuickAddEntity,
  WeightEntity,
  createFoodListener,
  createGoalListener,
  createWeightListener,
  createHeightListener,
  createPreferencesListener,
  createQuickAddListener,
  deleteFoodListener,
  deleteGoalListener,
  deleteQuickAddListener,
  getEverything,
  unsubscribeListeners,
  updateFoodListener,
  updatePreferencesListener,
} from "../data/entities";
import {
  customQuickAdd,
  defaultQuickAdds,
} from "./settings-page/QuickAddConfiguration";
import { getStreakInfo, StreakInfo } from "../helpers/getStreakInfo";
import { App } from "@capacitor/app";
import AphorismsPage from "./AphorismsPage";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ChatIcon from "@mui/icons-material/Chat";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { isIos } from "../helpers/getHealthKitData";

const WIDGET_PREFERENCES_GROUP = "group.com.johncorser.fit.prefs";
const CONSUMED_CALORIES_PREFERENCES_KEY = "consumedCalories";
const CONSUMED_CALORIES_DAY_PREFERENCES_KEY = "consumedCaloriesDay";

const setTodaysCaloriesPreferences = async (calories: number) => {
  if (!isIos()) {
    return;
  }

  await WidgetsBridgePlugin.setItem({
    group: WIDGET_PREFERENCES_GROUP,
    key: CONSUMED_CALORIES_PREFERENCES_KEY,
    value: calories.toString(),
  });
  // Widget in date format like Sep 8, 2024
  await WidgetsBridgePlugin.setItem({
    group: WIDGET_PREFERENCES_GROUP,
    key: CONSUMED_CALORIES_DAY_PREFERENCES_KEY,
    value:
      new Date().toLocaleDateString(undefined, {
        month: "short",
      }) +
      " " +
      new Date().toLocaleDateString(undefined, {
        day: "numeric",
      }) +
      ", " +
      new Date().toLocaleDateString(undefined, {
        year: "numeric",
      }),
  });

  await WidgetsBridgePlugin.reloadAllTimelines();
  await getTodaysCaloriesPreferences();
};

const getTodaysCaloriesPreferences = async () => {
  if (!isIos()) {
    return;
  }

  const consumedCaloriesResult = await WidgetsBridgePlugin.getItem({
    group: WIDGET_PREFERENCES_GROUP,
    key: CONSUMED_CALORIES_PREFERENCES_KEY,
  });
  const consumedCaloriesDayResult = await WidgetsBridgePlugin.getItem({
    group: WIDGET_PREFERENCES_GROUP,
    key: CONSUMED_CALORIES_DAY_PREFERENCES_KEY,
  });

  console.log(`ConsumedCalories`, { consumedCaloriesResult });
  console.log(`ConsumedCaloriesDay`, { consumedCaloriesDayResult });
};

export default function TabsView() {
  const [randomNumber, setRandomNumber] = useState(Math.random());
  const [toggleListeners, setToggleListeners] = useState<boolean>(false);
  const [allState, setAllState] = useState<{
    allFoods: FoodEntity[];
    allQuickAdds: QuickAddEntity[];
    goal?: GoalEntity;
    preferences: PreferencesEntity;
    weight: WeightEntity;
    height: HeightEntity;
    healthKitCaches: HealthKitCacheEntity[];
    streak: StreakInfo;
    user: AuthUser;
  }>();
  const setupQuickAdds = (
    existingQuickAdds: QuickAddEntity[],
  ): QuickAddEntity[] => {
    const withCustomRemoved = existingQuickAdds.filter(
      (quickAdd) => quickAdd.id !== "dqa-Custom",
    );
    if (withCustomRemoved.length) {
      return [...withCustomRemoved, customQuickAdd];
    } else {
      return defaultQuickAdds;
    }
  };

  useEffect(() => {
    const setup = async () => {
      const user = await getCurrentUser();
      const {
        allFoods,
        allQuickAdds,
        goal,
        preferences,
        weight,
        height,
        healthKitCaches,
        streak,
      } = await getEverything();
      setAllState({
        allFoods,
        allQuickAdds: await setupQuickAdds(allQuickAdds),
        goal,
        preferences,
        weight,
        height,
        healthKitCaches,
        streak,
        user,
      });
    };
    setup();
  }, []);

  useEffect(() => {
    const createFoodSubscription = createFoodListener(
      async (food: FoodEntity) => {
        if (!allState) return;
        const newAllFoods = [...allState.allFoods, food];
        const todaysCalories = newAllFoods
          .filter((food) => food.day === new Date().toLocaleDateString())
          .reduce((acc, food) => acc + food.calories, 0);
        setTodaysCaloriesPreferences(todaysCalories);
        const streak = await getStreakInfo(
          newAllFoods,
          new Date(),
          allState.healthKitCaches,
          allState.preferences,
        );
        setAllState({
          ...allState,
          allFoods: newAllFoods,
          streak,
        });
      },
    );
    const updateFoodSubscription = updateFoodListener(
      async (food: FoodEntity) => {
        if (!allState) return;
        const newAllFoods = allState.allFoods.map((f) =>
          f.id === food.id ? food : f,
        );
        const todaysCalories = newAllFoods
          .filter((food) => food.day === new Date().toLocaleDateString())
          .reduce((acc, food) => acc + food.calories, 0);
        setTodaysCaloriesPreferences(todaysCalories);
        setAllState({
          ...allState,
          allFoods: newAllFoods,
        });
      },
    );
    const deleteFoodSubscription = deleteFoodListener(
      async (deletedFood: FoodEntity) => {
        if (!allState) return;
        const newAllFoods = allState.allFoods.filter(
          (food) => food.id !== deletedFood.id,
        );
        const streak = await getStreakInfo(
          newAllFoods,
          new Date(),
          allState.healthKitCaches,
          allState.preferences,
        );
        setAllState({
          ...allState,
          allFoods: newAllFoods,
          streak,
        });
      },
    );
    const createGoalSubscription = createGoalListener(
      async (goal: GoalEntity) => {
        if (!allState) return;
        setAllState({
          ...allState,
          goal,
        });
      },
    );
    const deleteGoalSubscription = deleteGoalListener(async () => {
      if (!allState) return;
      setAllState({
        ...allState,
        goal: undefined,
      });
    });
    const createQuickAddSubscription = createQuickAddListener(
      (createdQuickAdd: QuickAddEntity) => {
        if (!allState) return;
        const isDefault = !!allState.allQuickAdds.find((quickAdd) =>
          quickAdd.id.startsWith("dqa-100"),
        );
        let quickAdds = [];
        if (isDefault) {
          quickAdds = setupQuickAdds([createdQuickAdd]);
        } else {
          const updatedQuickAdds = [...allState.allQuickAdds, createdQuickAdd];
          quickAdds = setupQuickAdds(updatedQuickAdds);
        }
        setAllState({
          ...allState,
          allQuickAdds: quickAdds,
        });
      },
    );
    const deleteQuickAddSubscription = deleteQuickAddListener(
      (deletedQuickAdd: QuickAddEntity) => {
        if (!allState) return;
        const updatedQuickAdds = allState.allQuickAdds.filter(
          (quickAdd) => quickAdd.id !== deletedQuickAdd.id,
        );
        const quickAdds = setupQuickAdds(updatedQuickAdds);
        setAllState({
          ...allState,
          allQuickAdds: quickAdds,
        });
        setupQuickAdds(updatedQuickAdds);
      },
    );
    const createPreferencesSubscription = createPreferencesListener(
      async (preferences: PreferencesEntity) => {
        if (!allState) return;
        const streak = await getStreakInfo(
          allState.allFoods,
          new Date(),
          allState.healthKitCaches,
          preferences,
        );
        setAllState({
          ...allState,
          preferences,
          streak,
        });
      },
    );
    const updatePreferencesSubscription = updatePreferencesListener(
      async (preferences: PreferencesEntity) => {
        if (!allState) return;
        const streak = await getStreakInfo(
          allState.allFoods,
          new Date(),
          allState.healthKitCaches,
          preferences,
        );
        setAllState({
          ...allState,
          preferences,
          streak,
        });
      },
    );

    const createWeightSubscription = createWeightListener(
      async (weight: WeightEntity) => {
        if (!allState) return;
        setAllState({
          ...allState,
          weight,
        });
      },
    );
    const createHeightSubscription = createHeightListener(
      async (height: HeightEntity) => {
        if (!allState) return;
        setAllState({
          ...allState,
          height,
        });
      },
    );
    App.addListener("appStateChange", async ({ isActive }) => {
      if (isActive && allState) {
        const streak = await getStreakInfo(
          allState.allFoods,
          new Date(),
          allState.healthKitCaches,
          allState.preferences,
        );
        setAllState({
          ...allState,
          streak,
        });
        setToggleListeners(!toggleListeners);
      }
    });
    return () => {
      unsubscribeListeners([
        createFoodSubscription,
        updateFoodSubscription,
        deleteFoodSubscription,
        createGoalSubscription,
        deleteGoalSubscription,
        createQuickAddSubscription,
        deleteQuickAddSubscription,
        createPreferencesSubscription,
        updatePreferencesSubscription,
        createWeightSubscription,
        createHeightSubscription,
      ]);
      App.removeAllListeners();
    };
  }, [allState, toggleListeners]);

  if (!allState) return <Loader variation="linear" />;
  const todaysCalories = allState.allFoods
    .filter((food) => food.day === new Date().toLocaleDateString())
    .reduce((acc, food) => acc + food.calories, 0);
  setTodaysCaloriesPreferences(todaysCalories);

  return (
    <>
      <Tabs
        justifyContent="flex-start"
        spacing="equal"
        onValueChange={() => setRandomNumber(Math.random())}
        defaultValue="Calories"
        items={[
          {
            label: <RestaurantIcon />,
            value: "Calories",
            content: (
              <CaloriePage
                allFoods={allState.allFoods}
                quickAdds={allState.allQuickAdds}
                goal={allState.goal}
                preferences={allState.preferences}
                streakInfo={allState.streak!}
                dayInfo={allState.streak!.today}
                healthKitCaches={allState.healthKitCaches}
              />
            ),
          },
          {
            label: <MonitorWeightIcon />,
            value: "Weight",
            content: (
              <WeightPage
                preferences={allState.preferences}
                height={allState.height}
                weight={allState.weight}
                healthKitCaches={allState.healthKitCaches}
              />
            ),
          },
          {
            label: <QueryStatsIcon />,
            value: "Stats",
            content: (
              <StatsPage
                allFoods={allState.allFoods}
                streakInfo={allState.streak}
                preferences={allState.preferences}
                healthKitCaches={allState.healthKitCaches}
              />
            ),
          },
          {
            label: <FormatQuoteIcon />,
            value: "Aphorisms",
            content: <AphorismsPage />,
          },
          {
            label: <ChatIcon />,
            value: "Chat",
            content: (
              <ChatPage user={allState.user} randomNumber={randomNumber} />
            ),
          },
          {
            label: <ManageAccountsIcon />,
            value: "Settings",
            content: (
              <SettingsPage
                preferences={allState.preferences}
                quickAdds={allState.allQuickAdds}
              />
            ),
          },
        ]}
      />
    </>
  );
}
