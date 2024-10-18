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
  getEverythingCache,
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
import { AuthUser } from "aws-amplify/auth";
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
  const [randomNumber, setRandomNumber] = useState(0);
  const everything = getEverythingCache();
  const [allFoods, setAllFoods] = useState<FoodEntity[]>(
    everything?.allFoods ?? [],
  );
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
  const [allQuickAdds, setAllQuickAdds] = useState<QuickAddEntity[]>(
    everything?.allQuickAdds ? setupQuickAdds(everything.allQuickAdds) : [],
  );
  const [allState, setAllState] = useState<
    | {
        // allFoods: FoodEntity[];
        // allQuickAdds: QuickAddEntity[];
        goal?: GoalEntity;
        preferences: PreferencesEntity;
        weight: WeightEntity;
        height: HeightEntity;
        healthKitCaches: HealthKitCacheEntity[];
        streak: StreakInfo;
        user: AuthUser;
      }
    | undefined
  >(everything);

  const handleOptimisticAddFood = async (
    food: FoodEntity,
    filterFn: (food: FoodEntity) => boolean,
  ) => {
    if (!allState) return;
    console.log("OPTIMISTIC addfood");
    const newAllFoods = [...allFoods, food];
    const todaysCalories = newAllFoods
      .filter((food) => food.day === new Date().toLocaleDateString())
      .reduce((acc, food) => acc + food.calories, 0);
    setTodaysCaloriesPreferences(todaysCalories);
    const streak = await getStreakInfo(
      newAllFoods.filter(filterFn),
      new Date(),
      allState.healthKitCaches,
      allState.preferences,
    );
    setAllState({
      ...allState,
      streak,
    });
    setAllFoods(newAllFoods.filter(filterFn));
  };

  const handleOptimisticRemoveFood = async (deletedFood: FoodEntity) => {
    if (!allState) return;
    console.log("OPTIMISTIC deletefood");
    const newAllFoods = allFoods.filter((food) => food.id !== deletedFood.id);
    const streak = await getStreakInfo(
      newAllFoods,
      new Date(),
      allState.healthKitCaches,
      allState.preferences,
    );
    setAllState({
      ...allState,
      // allFoods: newAllFoods,
      streak,
    });
    setAllFoods(newAllFoods);
  };

  const setup = async (bypassCache = false) => {
    const everything = await getEverything(bypassCache);
    if (!everything) return;

    const {
      allFoods,
      allQuickAdds,
      goal,
      preferences,
      weight,
      height,
      healthKitCaches,
      streak,
      user,
    } = everything;
    setAllState({
      // allFoods,
      // allQuickAdds: setupQuickAdds(allQuickAdds),
      goal,
      preferences,
      weight,
      height,
      healthKitCaches,
      streak,
      user,
    });
    setAllQuickAdds(setupQuickAdds(allQuickAdds));
    setAllFoods(allFoods);
    setRandomNumber(Math.random());
  };

  useEffect(() => {
    console.log("SETUP EFFECT RUNNING");
    setup(true);
  }, []);

  const onSubscriptionEvent = async () => {
    console.log("onSubscriptionEvent RUNNING");
    await setup();
    console.log("onSubscriptionEvent COMPLETE");
  };
  useEffect(() => {
    console.log("SUBSCRIPTIONS EFFECT RUNNING");
    const createFoodSubscription = createFoodListener(onSubscriptionEvent);
    const updateFoodSubscription = updateFoodListener(onSubscriptionEvent);
    const deleteFoodSubscription = deleteFoodListener(onSubscriptionEvent);
    const createGoalSubscription = createGoalListener(onSubscriptionEvent);
    const deleteGoalSubscription = deleteGoalListener(onSubscriptionEvent);
    const createQuickAddSubscription =
      createQuickAddListener(onSubscriptionEvent);
    const deleteQuickAddSubscription =
      deleteQuickAddListener(onSubscriptionEvent);
    const createPreferencesSubscription =
      createPreferencesListener(onSubscriptionEvent);
    const updatePreferencesSubscription =
      updatePreferencesListener(onSubscriptionEvent);
    const createWeightSubscription = createWeightListener(onSubscriptionEvent);
    const createHeightSubscription = createHeightListener(onSubscriptionEvent);
    App.addListener("appStateChange", async ({ isActive }) => {
      if (isActive) {
        setup();
        setRandomNumber(Math.random());
      }
      if (!isActive) {
        const todaysCalories = allFoods
          .filter((food) => food.day === new Date().toLocaleDateString())
          .reduce((acc, food) => acc + food.calories, 0);
        setTodaysCaloriesPreferences(todaysCalories);
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
  }, [randomNumber]);

  if (!allState) return <Loader variation="linear" />;
  return (
    <>
      <Tabs
        justifyContent="flex-start"
        spacing="equal"
        onValueChange={(value: string) => {
          if (value === "Chat") {
            setRandomNumber(Math.random());
          }
        }}
        defaultValue="Calories"
        items={[
          {
            label: <RestaurantIcon />,
            value: "Calories",
            content: (
              <CaloriePage
                allFoods={allFoods}
                quickAdds={allQuickAdds}
                goal={allState.goal}
                preferences={allState.preferences}
                streakInfo={allState.streak!}
                dayInfo={allState.streak!.today}
                healthKitCaches={allState.healthKitCaches}
                onAdd={(food: FoodEntity) =>
                  handleOptimisticAddFood(food, () => true)
                }
                onRemove={handleOptimisticRemoveFood}
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
                allFoods={allFoods}
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
                quickAdds={allQuickAdds}
              />
            ),
          },
        ]}
      />
    </>
  );
}
