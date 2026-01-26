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
  const { data: caches = [], refetch } = useHealthKitCache();
  const createCache = useCreateHealthKitCache();
  const updateCache = useUpdateHealthKitCache();

  if (Capacitor.getPlatform() !== "ios") {
    return null;
  }

  const handleSync = async () => {
    setSyncing(true);
    const latestCaches = (await refetch()).data ?? caches;

    // Sync last 7 days
    for (let i = 0; i < 7; i++) {
      const date = subDays(new Date(), i);
      const dayString = date.toLocaleDateString();
      const existingCache = latestCaches.find((c) => c.day === dayString);

      const data = await getHealthKitData(date);

      if (data.activeCalories > 0 || data.baseCalories > 0) {
        const cacheData = {
          day: dayString,
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
    }

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
