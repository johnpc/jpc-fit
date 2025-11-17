import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/amplify-client";
import { WeightEntity } from "../lib/types";
import { useAuth } from "./useAuth";

export function useWeight() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["weight"],
    queryFn: async () => {
      const { data } = await client.models.Weight.list({ limit: 5000 });
      return (data as WeightEntity[]).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    enabled: !!user,
  });
}

export function useCreateWeight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (weight: { currentWeight: number }) => {
      const { data } = await client.models.Weight.create(weight);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weight"] });
    },
  });
}

export function useDeleteWeight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await client.models.Weight.delete({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weight"] });
    },
  });
}
