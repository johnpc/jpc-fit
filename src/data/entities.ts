import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { Subscription } from "rxjs";
import config from "../../amplifyconfiguration.json";
import { Schema } from "../../amplify/data/resource";
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

export const getGoal = async (): Promise<GoalEntity | undefined> => {
  const allGoals = (await client.models.Goal.list()).data;
  return allGoals
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .find((g) => g);
};

export const createGoal = async (dietCalories: number): Promise<GoalEntity> => {
  const createdGoal = await client.models.Goal.create({
    dietCalories,
  });
  return {
    ...createdGoal.data,
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
    return preference.data;
  } else {
    const preference = await client.models.Preferences.update({
      id: preferences.id,
      hideProtein: preferences.hideProtein,
      hideSteps: preferences.hideSteps,
    });
    return preference.data;
  }
};

export const createWeight = async (
  currentWeight: number,
): Promise<WeightEntity> => {
  const createdWeight = await client.models.Weight.create({
    currentWeight,
  });
  return {
    ...createdWeight.data,
  };
};

export const createHeight = async (
  currentHeight: number,
): Promise<HeightEntity> => {
  const createdHeight = await client.models.Height.create({
    currentHeight,
  });
  return {
    ...createdHeight.data,
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
    ...createdQuickAdd.data,
    createdAt: new Date(createdQuickAdd.data.createdAt),
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
    selectionSet: ["id", "day", "calories", "protein", "createdAt", "name"],
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
  const foods = await client.models.Food.listByDay(
    { day: date.toLocaleDateString() },
    {
      selectionSet: ["id", "day", "calories", "protein", "createdAt", "name"],
    },
  );
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
    ...createdFood.data,
    createdAt: new Date(createdFood.data.updatedAt),
  };
};

export const deleteFood = async (food: FoodEntity) => {
  await client.models.Food.delete({ id: food.id });
};

export const createFoodListener = (fn: (food: FoodEntity) => void) => {
  const listener = client.models.Food.onCreate().subscribe({
    next: async (food: Schema["Food"]) => {
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
    next: async (quickAdd: Schema["QuickAdd"]) => {
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
    next: async (quickAdd: Schema["QuickAdd"]) => {
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
    next: async (food: Schema["Food"]) => {
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
    next: async (goal: Schema["Goal"]) => {
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
    next: async (preferences: Schema["Preferences"]) => {
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
    next: async (preferences: Schema["Preferences"]) => {
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

export const createWeightListener = (fn: () => void) => {
  const listener = client.models.Weight.onCreate().subscribe({
    next: async () => {
      fn();
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const createHeightListener = (fn: () => void) => {
  const listener = client.models.Height.onCreate().subscribe({
    next: async () => {
      fn();
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const unsubscribeListener = (subscription: Subscription) => {
  return subscription.unsubscribe();
};
