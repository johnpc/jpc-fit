import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/amplify-client";
import { GoalEntity } from "../lib/types";

export function useGoal() {
  return useQuery({
    queryKey: ["goal"],
    queryFn: async () => {
      const { data } = await client.models.Goal.list({ limit: 5000 });
      return data[0] as GoalEntity | undefined;
    },
  });
}

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goal: Partial<GoalEntity>) => {
      const existing = queryClient.getQueryData<GoalEntity>(["goal"]);

      if (existing?.id) {
        const { data } = await client.models.Goal.update({
          id: existing.id,
          ...goal,
        });
        return data;
      } else {
        const { data } = await client.models.Goal.create(goal as { dietCalories: number });
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goal"] });
    },
  });
}
