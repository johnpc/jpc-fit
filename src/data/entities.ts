import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { Subscription } from "rxjs";
import config from "../../amplify_outputs.json";
import { Schema } from "../../amplify/data/resource";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { getStreakInfo, StreakInfo } from "../helpers/getStreakInfo";
import {
  EVERYTHING_KEY,
  EVERYTHING_LOCK_KEY,
  getCache,
  setCache,
} from "./cache";
Amplify.configure(config);
const client = generateClient<Schema>({
  authMode: "userPool",
});
export type FoodEntity = {
  id: string;
  calories: number;
  protein?: number | undefined | null;
  day: string;
  name?: string | undefined | null;
  notes?: string | undefined | null;
  photos?: (string | null | undefined)[] | undefined | null;
  createdAt: Date;
};

export type PreferencesEntity = {
  id?: string;
  hideProtein?: boolean | null;
  hideSteps?: boolean | null;
};

export type GoalEntity = {
  dietCalories: number;
};

export type WeightEntity = {
  currentWeight: number;
};

export type HeightEntity = {
  currentHeight: number;
};

export type QuickAddEntity = {
  id: string;
  name: string;
  calories: number;
  protein?: number | undefined | null;
  icon: string;
  createdAt: Date;
};

export type HealthKitCacheEntity = {
  activeCalories: number;
  baseCalories: number;
  weight?: number;
  steps?: number;
  day: Date;
};

export const getGoal = async (): Promise<GoalEntity | undefined> => {
  const allGoals = (await client.models.Goal.list()).data;
  return allGoals
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .find((g) => g);
};

export const getHealthKitCacheForDate = async (
  date: Date,
): Promise<HealthKitCacheEntity | undefined> => {
  const currentUser = await getCurrentUser();
  const dayString =
    date.toLocaleDateString(undefined, {
      month: "numeric",
    }) +
    "-" +
    date.toLocaleDateString(undefined, {
      day: "numeric",
    }) +
    "-" +
    date.toLocaleDateString(undefined, {
      year: "numeric",
    });
  const healthKitCache = await client.models.HealthKitCache.get({
    id: currentUser.userId + dayString,
  });
  if (healthKitCache.errors) {
    console.log({ healthKitCache, errors: healthKitCache.errors });
  }

  if (!healthKitCache.data) {
    return undefined;
  }

  return {
    activeCalories: healthKitCache.data.activeCalories,
    baseCalories: healthKitCache.data.baseCalories,
    weight: healthKitCache.data.weight ?? undefined,
    steps: healthKitCache.data.steps ?? undefined,
    day: new Date(healthKitCache.data.day),
  };
};

export const createHealthKitCache = async (
  cacheEntity: HealthKitCacheEntity,
): Promise<void> => {
  const currentUser = await getCurrentUser();
  const dayString =
    cacheEntity.day.toLocaleDateString(undefined, {
      month: "numeric",
    }) +
    "-" +
    cacheEntity.day.toLocaleDateString(undefined, {
      day: "numeric",
    }) +
    "-" +
    cacheEntity.day.toLocaleDateString(undefined, {
      year: "numeric",
    });

  const createdHealthKitCacheEntity = await client.models.HealthKitCache.create(
    {
      ...cacheEntity,
      id: currentUser.userId + dayString,
      day: cacheEntity.day.toLocaleDateString(),
    },
  );
  console.log({
    createdHealthKitCacheEntity: createdHealthKitCacheEntity?.data,
    errors: createdHealthKitCacheEntity?.errors,
  });
};

export const listHealthKitCaches = async (): Promise<
  HealthKitCacheEntity[]
> => {
  const healthKitCaches = (
    await client.models.HealthKitCache.list({
      limit: 100000,
    })
  ).data;
  return healthKitCaches.map((h) => ({
    activeCalories: h.activeCalories,
    baseCalories: h.baseCalories,
    weight: h.weight ?? undefined,
    steps: h.steps ?? undefined,
    day: new Date(h.day),
  }));
};

export const createGoal = async (dietCalories: number): Promise<GoalEntity> => {
  const createdGoal = await client.models.Goal.create({
    dietCalories,
  });
  return {
    ...createdGoal.data!,
  };
};

export const deleteGoal = async (): Promise<void> => {
  const goals = await client.models.Goal.list();
  const promises = goals.data.map((goal) =>
    client.models.Goal.delete({ id: goal.id }),
  );
  await Promise.all(promises);
};

export const getWeight = async (): Promise<WeightEntity | undefined> => {
  const allWeights = (await client.models.Weight.list()).data;
  return allWeights
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .find((g) => g);
};

export const getHeight = async (): Promise<HeightEntity | undefined> => {
  const allHeights = (await client.models.Height.list()).data;
  return allHeights
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .find((g) => g);
};

export const getPreferences = async (): Promise<PreferencesEntity> => {
  const allPreferences = (await client.models.Preferences.list()).data ?? [];
  const preferences = allPreferences
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .find((g) => g);

  if (!preferences) {
    return {
      id: undefined,
      hideProtein: false,
      hideSteps: false,
    };
  }
  return preferences;
};

export const updatePreferences = async (
  preferences: PreferencesEntity,
): Promise<PreferencesEntity> => {
  if (!preferences.id) {
    const preference = await client.models.Preferences.create({
      hideProtein: preferences.hideProtein ?? false,
      hideSteps: preferences.hideSteps ?? false,
    });
    return preference.data!;
  } else {
    const preference = await client.models.Preferences.update({
      id: preferences.id,
      hideProtein: preferences.hideProtein,
      hideSteps: preferences.hideSteps,
    });
    return preference.data!;
  }
};

export const createWeight = async (
  currentWeight: number,
): Promise<WeightEntity> => {
  const createdWeight = await client.models.Weight.create({
    currentWeight,
  });
  return {
    ...createdWeight.data!,
  };
};

export const createHeight = async (
  currentHeight: number,
): Promise<HeightEntity> => {
  const createdHeight = await client.models.Height.create({
    currentHeight,
  });
  return {
    ...createdHeight.data!,
  };
};

export const createQuickAdd = async (
  name: string,
  calories: number,
  icon: string,
  protein?: number,
): Promise<QuickAddEntity> => {
  const createdQuickAdd = await client.models.QuickAdd.create({
    name,
    calories,
    icon,
    protein,
  });
  return {
    ...createdQuickAdd.data!,
    createdAt: new Date(createdQuickAdd.data!.createdAt),
  };
};

export const deleteQuickAdd = async (quickAdd: QuickAddEntity) => {
  await client.models.QuickAdd.delete({ id: quickAdd.id });
};

export const listQuickAdds = async (): Promise<QuickAddEntity[]> => {
  const quickAdds = await client.models.QuickAdd.list({
    selectionSet: ["id", "name", "calories", "protein", "icon", "createdAt"],
  });
  return (
    quickAdds.data
      ?.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
      .map((quickAdd) => ({
        ...quickAdd,
        createdAt: new Date(quickAdd.createdAt),
      })) ?? []
  );
};

export const listAllFood = async (): Promise<FoodEntity[]> => {
  const foods = await client.models.Food.list({
    limit: 10000,
    selectionSet: [
      "id",
      "day",
      "calories",
      "notes",
      "photos",
      "protein",
      "createdAt",
      "name",
    ],
  });
  return (
    foods.data
      ?.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
      .map((food) => ({
        ...food,
        createdAt: new Date(food.createdAt),
      })) ?? []
  );
};

export const listFood = async (date: Date): Promise<FoodEntity[]> => {
  const foods = await client.models.Food.listFoodByDay(
    { day: date.toLocaleDateString() },
    {
      selectionSet: [
        "id",
        "day",
        "calories",
        "protein",
        "createdAt",
        "updatedAt",
        "name",
      ],
    },
  );
  return (
    foods.data
      ?.sort(
        (a: Schema["Food"]["type"], b: Schema["Food"]["type"]) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
      .map((food: Schema["Food"]["type"]) => ({
        ...food,
        createdAt: new Date(food.createdAt),
      })) ?? []
  );
};

export const createFood = async (
  name: string,
  calories: number,
  protein: number,
  date: Date,
): Promise<FoodEntity> => {
  const createdFood = await client.models.Food.create({
    name,
    calories,
    protein,
    day: date.toLocaleDateString(),
  });
  return {
    ...createdFood.data!,
    createdAt: new Date(createdFood.data!.updatedAt),
  };
};

export const updateFood = async (food: FoodEntity): Promise<FoodEntity> => {
  const updatedFood = await client.models.Food.update({
    id: food.id,
    calories: food.calories,
    protein: food.protein,
    day: food.day,
    name: food.name,
    notes: food.notes,
    photos: (food.photos as string[]) ?? [],
  });
  return {
    ...updatedFood.data!,
    id: updatedFood.data!.id!,
    calories: updatedFood.data!.calories!,
    createdAt: new Date(updatedFood.data!.updatedAt),
  };
};

export const deleteFood = async (food: FoodEntity) => {
  await client.models.Food.delete({ id: food.id });
};

export const refreshEverythingCache = () => {
  getEverything();
};

export const getEverythingCache = ():
  | {
      allFoods: FoodEntity[];
      allQuickAdds: QuickAddEntity[];
      goal?: GoalEntity;
      preferences: PreferencesEntity;
      weight: WeightEntity;
      height: HeightEntity;
      healthKitCaches: HealthKitCacheEntity[];
      streak: StreakInfo;
      user: AuthUser;
    }
  | undefined => {
  const json = getCache(EVERYTHING_KEY);
  if (!json) return undefined;
  return JSON.parse(json);
};

const sleep = (durationMs: number) =>
  new Promise((resolve) => setTimeout(resolve, durationMs));

export const getEverything = async (
  overrideLock = false,
): Promise<
  | {
      allFoods: FoodEntity[];
      allQuickAdds: QuickAddEntity[];
      goal?: GoalEntity;
      preferences: PreferencesEntity;
      weight: WeightEntity;
      height: HeightEntity;
      healthKitCaches: HealthKitCacheEntity[];
      streak: StreakInfo;
      user: AuthUser;
    }
  | undefined
> => {
  let lock = getCache(EVERYTHING_LOCK_KEY);
  let count = 0;
  if (!overrideLock) {
    while (lock === "locked") {
      await sleep(1000);
      count += 1;
      if (count > 3) break;
      lock = getCache(EVERYTHING_LOCK_KEY);
    }
  }

  setCache(EVERYTHING_LOCK_KEY, "locked");

  const [
    allFoods,
    allQuickAdds,
    goal,
    preferences,
    weight,
    height,
    healthKitCaches,
  ] = await Promise.all([
    listAllFood(),
    listQuickAdds(),
    getGoal(),
    getPreferences(),
    getWeight(),
    getHeight(),
    listHealthKitCaches(),
  ]);

  const streak = await getStreakInfo(
    allFoods,
    new Date(),
    healthKitCaches,
    preferences,
  );
  const user = await getCurrentUser();

  const everything = {
    allFoods,
    allQuickAdds,
    goal,
    preferences,
    weight: weight ?? { currentWeight: 0 },
    height: height ?? { currentHeight: 0 },
    healthKitCaches,
    streak,
    user,
  };

  setCache(EVERYTHING_KEY, JSON.stringify(everything));
  setCache(EVERYTHING_LOCK_KEY, "unlocked");
  return everything;
};

export const createFoodListener = (fn: (food: FoodEntity) => void) => {
  const listener = client.models.Food.onCreate().subscribe({
    next: async (food: Schema["Food"]["type"]) => {
      fn({ ...food, createdAt: new Date(food.updatedAt) });
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const updateFoodListener = (fn: (food: FoodEntity) => void) => {
  const listener = client.models.Food.onUpdate().subscribe({
    next: async (food: Schema["Food"]["type"]) => {
      fn({ ...food, createdAt: new Date(food.updatedAt) });
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const createQuickAddListener = (
  fn: (quickAdd: QuickAddEntity) => void,
) => {
  const listener = client.models.QuickAdd.onCreate().subscribe({
    next: async (quickAdd: Schema["QuickAdd"]["type"]) => {
      fn({ ...quickAdd, createdAt: new Date(quickAdd.createdAt) });
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const deleteQuickAddListener = (
  fn: (quickAdd: QuickAddEntity) => void,
) => {
  const listener = client.models.QuickAdd.onDelete().subscribe({
    next: async (quickAdd: Schema["QuickAdd"]["type"]) => {
      fn({ ...quickAdd, createdAt: new Date(quickAdd.createdAt) });
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const deleteFoodListener = (fn: (food: FoodEntity) => void) => {
  const listener = client.models.Food.onDelete().subscribe({
    next: async (food: Schema["Food"]["type"]) => {
      fn({ ...food, createdAt: new Date(food.updatedAt) });
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const createGoalListener = (fn: (createdGoal: GoalEntity) => void) => {
  const listener = client.models.Goal.onCreate().subscribe({
    next: async (goal: Schema["Goal"]["type"]) => {
      fn(goal);
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const createPreferencesListener = (
  fn: (preferences: PreferencesEntity) => void,
) => {
  const listener = client.models.Preferences.onCreate().subscribe({
    next: async (preferences: Schema["Preferences"]["type"]) => {
      fn(preferences);
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const updatePreferencesListener = (
  fn: (preferences: PreferencesEntity) => void,
) => {
  const listener = client.models.Preferences.onUpdate().subscribe({
    next: async (preferences: Schema["Preferences"]["type"]) => {
      fn(preferences);
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const deleteGoalListener = (fn: () => void) => {
  const listener = client.models.Goal.onDelete().subscribe({
    next: async () => {
      fn();
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const createWeightListener = (fn: (weight: WeightEntity) => void) => {
  const listener = client.models.Weight.onCreate().subscribe({
    next: async (weight: Schema["Weight"]["type"]) => {
      fn(weight);
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const createHeightListener = (fn: (height: HeightEntity) => void) => {
  const listener = client.models.Height.onCreate().subscribe({
    next: async (height: Schema["Height"]["type"]) => {
      fn(height);
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const unsubscribeListeners = (subscriptions: Subscription[]) => {
  subscriptions.forEach((subscription) => subscription.unsubscribe());
};
