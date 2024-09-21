import { Loader, Tabs } from "@aws-amplify/ui-react";
import { WidgetsBridgePlugin } from "capacitor-widgetsbridge-plugin";
import CaloriePage from "./CaloriePage";
import WeightPage from "./WeightPage";
import SettingsPage from "./SettingsPage";
import ChatPage from "./ChatPage";
import StatsPage from "./StatsPage";
import { useEffect, useState } from "react";
import { App as CapacitorApp } from "@capacitor/app";
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

export default function TabsView(props: {
  healthKitCaches: HealthKitCacheEntity[];
  ready: boolean;
}) {
  const [randomNumber, setRandomNumber] = useState(Math.random());
  const [toggleListeners, setToggleListeners] = useState<boolean>(false);
  const [allFoods, setAllFoods] = useState<FoodEntity[]>([]);
  const [goal, setGoal] = useState<GoalEntity>();
  const [user, setUser] = useState<AuthUser>();
  const [height, setHeight] = useState<HeightEntity>();
  const [weight, setWeight] = useState<WeightEntity>();
  const [preferences, setPreferences] = useState<PreferencesEntity>({
    hideProtein: true,
    hideSteps: false,
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
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
    };

    const setup = async () => {
      await Promise.all([
        fetchFood(),
        fetchGoal(),
        fetchPreferences(),
        fetchQuickAdds(),
        fetchHeight(),
        fetchWeight(),
        fetchCurrentUser(),
      ]);
    };
    setup();
  }, []);

  useEffect(() => {
    const fetchStreak = async () => {
      if (!props.ready) return;
      const streak = await getStreakInfo(
        allFoods,
        new Date(),
        props.healthKitCaches,
        preferences,
      );
      setStreak(streak);
    };
    fetchStreak();
  }, [preferences, allFoods, props]);

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
          props.healthKitCaches,
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
          props.healthKitCaches,
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
        const streak = await getStreakInfo(
          allFoods,
          new Date(),
          props.healthKitCaches,
          preferences,
        );
        setStreak(streak);
      },
    );
    const updatePreferencesSubscription = updatePreferencesListener(
      async (preferences: PreferencesEntity) => {
        setPreferences(preferences);
        const streak = await getStreakInfo(
          allFoods,
          new Date(),
          props.healthKitCaches,
          preferences,
        );
        setStreak(streak);
      },
    );
    App.addListener("appStateChange", async ({ isActive }) => {
      if (isActive) {
        const streak = await getStreakInfo(
          allFoods,
          new Date(),
          props.healthKitCaches,
          preferences,
        );
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
  }, [
    allFoods,
    preferences,
    quickAdds,
    toggleListeners,
    lastOpenTime,
    props.healthKitCaches,
  ]);

  if (!streak || !props.ready) return <Loader variation="linear" />;
  const todaysCalories = allFoods
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
                allFoods={allFoods}
                quickAdds={quickAdds}
                goal={goal}
                preferences={preferences}
                streakInfo={streak}
                dayInfo={streak.today}
                healthKitCaches={props.healthKitCaches}
              />
            ),
          },
          {
            label: <MonitorWeightIcon />,
            value: "Weight",
            content: (
              <WeightPage
                preferences={preferences}
                height={height}
                weight={weight}
                healthKitCaches={props.healthKitCaches}
              />
            ),
          },
          {
            label: <QueryStatsIcon />,
            value: "Stats",
            content: (
              <StatsPage
                allFoods={allFoods}
                streakInfo={streak}
                preferences={preferences}
                healthKitCaches={props.healthKitCaches}
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
            content: <ChatPage user={user} randomNumber={randomNumber} />,
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
