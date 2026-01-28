import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/amplify-client";
import { FoodEntity } from "../lib/types";

export function useFood(day: string) {
  return useQuery({
    queryKey: ["food", day],
    queryFn: async () => {
      const { data } = await client.models.Food.listFoodByDay({ day });
      return (data as FoodEntity[]).sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    },
  });
}

export function useCreateFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (food: {
      name?: string;
      calories: number;
      protein?: number;
      day: string;
      notes?: string;
    }) => {
      const { data } = await client.models.Food.create(food);
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["food"] });
      if (data?.day) {
        await queryClient.invalidateQueries({ queryKey: ["food", data.day] });

        // Update widget if it's today
        if (data.day === new Date().toLocaleDateString()) {
          const { updateWidget } = await import("../helpers/updateWidget");
          await queryClient.refetchQueries({ queryKey: ["food"] });
          const allFoods =
            queryClient.getQueryData<FoodEntity[]>(["food"]) || [];
          const todaysCalories = allFoods
            .filter((f) => f.day === data.day)
            .reduce((sum, f) => sum + f.calories, 0);
          updateWidget(todaysCalories);
        }
      }
    },
  });
}

export function useUpdateFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (food: Partial<FoodEntity> & { id: string }) => {
      const { data } = await client.models.Food.update(food);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["food"] });
      if (data?.day) {
        queryClient.invalidateQueries({ queryKey: ["food", data.day] });
      }
    },
  });
}

export function useDeleteFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await client.models.Food.delete({ id });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["food"] });

      // Update widget for today
      const { updateWidget } = await import("../helpers/updateWidget");
      await queryClient.refetchQueries({ queryKey: ["food"] });
      const allFoods = queryClient.getQueryData<FoodEntity[]>(["food"]) || [];
      const todaysCalories = allFoods
        .filter((f) => f.day === new Date().toLocaleDateString())
        .reduce((sum, f) => sum + f.calories, 0);
      updateWidget(todaysCalories);
    },
  });
}
