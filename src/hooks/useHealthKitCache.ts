import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../lib/amplify-client";
import { HealthKitCacheEntity } from "../lib/types";
import { useAuth } from "./useAuth";
import { clearFetchingDay } from "./useFetchHealthKitData";

export function useHealthKitCache(day?: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: day ? ["healthKitCache", day] : ["healthKitCache"],
    queryFn: async () => {
      if (day) {
        const { data } =
          await client.models.HealthKitCache.listHealthKitCacheByDay({ day });
        console.log(
          "[HealthKitCache] fetched",
          data.length,
          "entries for",
          day,
        );
        return data as HealthKitCacheEntity[];
      }
      const { data } = await client.models.HealthKitCache.list({ limit: 5000 });
      console.log("[HealthKitCache] fetched", data.length, "entries");
      return (data as HealthKitCacheEntity[]).sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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
      const { data, errors } = await client.models.HealthKitCache.create(cache);
      if (errors?.length) {
        console.error("[HealthKitCache] create failed:", errors);
        throw new Error(errors[0].message);
      }
      return data;
    },
    onMutate: async (newCache) => {
      await queryClient.cancelQueries({
        queryKey: ["healthKitCache", newCache.day],
      });
      const previous = queryClient.getQueryData<HealthKitCacheEntity[]>([
        "healthKitCache",
        newCache.day,
      ]);
      queryClient.setQueryData<HealthKitCacheEntity[]>(
        ["healthKitCache", newCache.day],
        (old = []) => [
          {
            ...newCache,
            id: "temp-" + Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            owner: "",
          } as HealthKitCacheEntity,
          ...old,
        ],
      );
      return { previous, day: newCache.day };
    },
    onError: (_err, newCache, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["healthKitCache", context.day],
          context.previous,
        );
      }
      clearFetchingDay(newCache.day);
    },
    onSettled: (_data, _err, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["healthKitCache", variables.day],
      });
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
      const { data, errors } = await client.models.HealthKitCache.update(cache);
      if (errors?.length) {
        console.error("[HealthKitCache] update failed:", errors);
        throw new Error(errors[0].message);
      }
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["healthKitCache", variables.day],
      });
      queryClient.invalidateQueries({ queryKey: ["healthKitCache"] });
    },
  });
}
