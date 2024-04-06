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
  day: string;
  name?: string | undefined | null;
  createdAt: Date;
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
): Promise<QuickAddEntity> => {
  const createdQuickAdd = await client.models.QuickAdd.create({
    name,
    calories,
    icon,
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
    selectionSet: ["id", "name", "calories", "icon", "createdAt"],
  });
  return (
    quickAdds.data
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
      selectionSet: ["id", "day", "calories", "createdAt", "name"],
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
): Promise<FoodEntity> => {
  const createdFood = await client.models.Food.create({
    name,
    calories,
    day: new Date().toLocaleDateString(),
  });
  return {
    ...createdFood.data,
    createdAt: new Date(createdFood.data.updatedAt),
  };
};

export const deleteFood = async (food: FoodEntity) => {
  await client.models.Food.delete({ id: food.id });
};

export const createFoodListener = (fn: () => void) => {
  const listener = client.models.Food.onCreate().subscribe({
    next: async () => {
      fn();
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const createQuickAddListener = (fn: () => void) => {
  const listener = client.models.QuickAdd.onCreate().subscribe({
    next: async () => {
      fn();
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const deleteQuickAddListener = (fn: () => void) => {
  const listener = client.models.QuickAdd.onDelete().subscribe({
    next: async () => {
      fn();
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const deleteFoodListener = (fn: () => void) => {
  const listener = client.models.Food.onDelete().subscribe({
    next: async () => {
      fn();
    },
    error: (error: Error) => {
      console.error("Subscription error", error);
    },
  });
  return listener;
};

export const createGoalListener = (fn: () => void) => {
  const listener = client.models.Goal.onCreate().subscribe({
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
