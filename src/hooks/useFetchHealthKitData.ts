import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { getHealthKitData } from "../helpers/getHealthKitData";
import {
  useHealthKitCache,
  useCreateHealthKitCache,
  useUpdateHealthKitCache,
} from "./useHealthKitCache";

// Module-level to prevent duplicate fetches across component instances
const fetchingDays = new Set<string>();
export const clearFetchingDay = (day: string) => fetchingDays.delete(day);

export function useFetchHealthKitData(date: Date) {
  const dayString = date.toLocaleDateString();
  const { data: caches = [], isLoading: cachesLoading } =
    useHealthKitCache(dayString);
  const createCache = useCreateHealthKitCache();
  const updateCache = useUpdateHealthKitCache();
  const [isFetching, setIsFetching] = useState(false);

  const todayString = new Date().toLocaleDateString();
  const isToday = dayString === todayString;
  const existingCache = caches[0];

  useEffect(() => {
    if (Capacitor.getPlatform() !== "ios") return;
    if (cachesLoading) return;

    // For past days, skip if we have cache
    if (!isToday && existingCache) return;

    // Prevent concurrent fetches for same day
    if (fetchingDays.has(dayString)) return;

    const fetchData = async () => {
      setIsFetching(true);
      fetchingDays.add(dayString);

      try {
        const data = await getHealthKitData(date);

        // Skip save if no data
        if (data.activeCalories === 0 && data.baseCalories === 0) return;

        const cacheData = {
          day: dayString,
          activeCalories: data.activeCalories,
          baseCalories: data.baseCalories,
          weight: data.weight > 0 ? data.weight : undefined,
          steps: data.steps > 0 ? data.steps : undefined,
        };

        if (existingCache) {
          updateCache.mutate({ id: existingCache.id, ...cacheData });
        } else {
          createCache.mutate(cacheData);
        }
      } finally {
        setIsFetching(false);
        // Allow refetch after 30 seconds for today
        if (isToday) {
          setTimeout(() => fetchingDays.delete(dayString), 30000);
        }
      }
    };

    fetchData().catch(() => {
      fetchingDays.delete(dayString);
    });
  }, [dayString, isToday, existingCache?.id, cachesLoading]);

  return { isFetching };
}
