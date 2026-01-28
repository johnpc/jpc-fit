import { useState } from "react";
import { Card, Button } from "@aws-amplify/ui-react";
import { Capacitor } from "@capacitor/core";
import { subDays } from "date-fns";
import { getHealthKitData } from "../../helpers/getHealthKitData";
import {
  useCreateHealthKitCache,
  useHealthKitCache,
  useUpdateHealthKitCache,
} from "../../hooks/useHealthKitCache";

export function SyncHealthKit() {
  const [syncing, setSyncing] = useState(false);
  const createCache = useCreateHealthKitCache();
  const updateCache = useUpdateHealthKitCache();

  // Query each of the 7 days
  const dayStrings = Array.from({ length: 7 }, (_, i) =>
    subDays(new Date(), i).toLocaleDateString()
  );
  const cache0 = useHealthKitCache(dayStrings[0]);
  const cache1 = useHealthKitCache(dayStrings[1]);
  const cache2 = useHealthKitCache(dayStrings[2]);
  const cache3 = useHealthKitCache(dayStrings[3]);
  const cache4 = useHealthKitCache(dayStrings[4]);
  const cache5 = useHealthKitCache(dayStrings[5]);
  const cache6 = useHealthKitCache(dayStrings[6]);
  const cacheQueries = [cache0, cache1, cache2, cache3, cache4, cache5, cache6];

  if (Capacitor.getPlatform() !== "ios") {
    return null;
  }

  const handleSync = async () => {
    setSyncing(true);

    // Fetch all HealthKit data in parallel
    const dates = Array.from({ length: 7 }, (_, i) => subDays(new Date(), i));
    const [healthKitResults, cacheResults] = await Promise.all([
      Promise.all(dates.map((date) => getHealthKitData(date))),
      Promise.all(cacheQueries.map((q) => q.refetch())),
    ]);

    // Save all caches in parallel
    await Promise.all(
      dates.map(async (_, i) => {
        const data = healthKitResults[i];
        const existingCache = cacheResults[i].data?.[0];

        if (data.activeCalories > 0 || data.baseCalories > 0) {
          const cacheData = {
            day: dayStrings[i],
            activeCalories: data.activeCalories,
            baseCalories: data.baseCalories,
            weight: data.weight > 0 ? data.weight : undefined,
            steps: data.steps > 0 ? data.steps : undefined,
          };

          if (existingCache) {
            await updateCache.mutateAsync({ id: existingCache.id, ...cacheData });
          } else {
            await createCache.mutateAsync(cacheData);
          }
        }
      })
    );

    setSyncing(false);
  };

  return (
    <Card>
      <Button isFullWidth isLoading={syncing} onClick={handleSync}>
        Sync HealthKit Data (Last 7 Days)
      </Button>
    </Card>
  );
}
