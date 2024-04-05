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
  createdAt: Date;
};

export const listFood = async (date: Date): Promise<FoodEntity[]> => {
  const foods = await client.models.Food.listByDay(
    { day: date.toLocaleDateString() },
    {
      selectionSet: ["id", "day", "calories", "createdAt"],
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

export const createFood = async (calories: number): Promise<FoodEntity> => {
  const createdFood = await client.models.Food.create({
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

export const unsubscribeListener = (subscription: Subscription) => {
  return subscription.unsubscribe();
};
