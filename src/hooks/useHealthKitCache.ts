import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/amplify-client";
import { HealthKitCacheEntity } from "../lib/types";
import { useAuth } from "./useAuth";

export function useHealthKitCache() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["healthKitCache"],
    queryFn: async () => {
      const { data } = await client.models.HealthKitCache.list({ limit: 5000 });
      return (data as HealthKitCacheEntity[]).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    enabled: !!user,
  });
}

export function useCreateHealthKitCache() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cache: { 
      day: string; 
      activeCalories: number; 
      baseCalories: number; 
      weight?: number; 
      steps?: number;
    }) => {
      const { data } = await client.models.HealthKitCache.create(cache);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["healthKitCache"] });
    },
  });
}

export function useUpdateHealthKitCache() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cache: { 
      id: string;
      day: string; 
      activeCalories: number; 
      baseCalories: number; 
      weight?: number; 
      steps?: number;
    }) => {
      const { data } = await client.models.HealthKitCache.update(cache);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["healthKitCache"] });
    },
  });
}
