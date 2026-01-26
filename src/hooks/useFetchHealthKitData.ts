import { useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { endOfDay, subDays } from "date-fns";
import { getHealthKitData } from "../helpers/getHealthKitData";
import {
  useHealthKitCache,
  useCreateHealthKitCache,
  useUpdateHealthKitCache,
} from "./useHealthKitCache";

export function useFetchHealthKitData(date: Date) {
  const { data: caches = [] } = useHealthKitCache();
  const createCache = useCreateHealthKitCache();
  const updateCache = useUpdateHealthKitCache();
  const fetchedRef = useRef<Set<string>>(new Set());

  const dayString = date.toLocaleDateString();
  const isToday = date.getTime() >= endOfDay(subDays(new Date(), 1)).getTime();
  const existingCache = caches.find((c) => c.day === dayString);

  useEffect(() => {
    if (Capacitor.getPlatform() !== "ios") return;

    // Skip if already fetched this day this session
    if (fetchedRef.current.has(dayString)) return;

    // Skip if not today and we already have cache
    if (!isToday && existingCache) return;

    fetchedRef.current.add(dayString);

    const fetchData = async () => {
      const data = await getHealthKitData(date);

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
    };

    fetchData();
  }, [dayString, isToday, existingCache?.id]);
}
