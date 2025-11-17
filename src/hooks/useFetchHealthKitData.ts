import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { endOfDay, subDays } from "date-fns";
import { getHealthKitData } from "../helpers/getHealthKitData";
import { useHealthKitCache, useCreateHealthKitCache, useUpdateHealthKitCache } from "./useHealthKitCache";

export function useFetchHealthKitData(date: Date) {
  const { data: caches = [] } = useHealthKitCache();
  const createCache = useCreateHealthKitCache();
  const updateCache = useUpdateHealthKitCache();

  useEffect(() => {
    if (Capacitor.getPlatform() !== "ios") return;

    const dayString = date.toLocaleDateString();
    const isToday = date.getTime() >= endOfDay(subDays(new Date(), 1)).getTime();
    const existingCache = caches.find((c) => c.day === dayString);
    
    // Skip if not today and we already have cache
    if (!isToday && existingCache) return;

    // Fetch from HealthKit
    const fetchData = async () => {
      const data = await getHealthKitData(date);
      
      // Only proceed if we got real data
      if (data.activeCalories === 0 && data.baseCalories === 0) return;

      const cacheData = {
        day: dayString,
        activeCalories: data.activeCalories,
        baseCalories: data.baseCalories,
        weight: data.weight > 0 ? data.weight : undefined,
        steps: data.steps > 0 ? data.steps : undefined,
      };

      if (existingCache) {
        // Update existing cache (for today)
        updateCache.mutate({ id: existingCache.id, ...cacheData });
      } else {
        // Create new cache
        createCache.mutate(cacheData);
      }
    };

    fetchData();
  }, [date, caches, createCache, updateCache]);
}
