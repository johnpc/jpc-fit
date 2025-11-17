import { useState } from "react";
import { Card, Button } from "@aws-amplify/ui-react";
import { Capacitor } from "@capacitor/core";
import { subDays } from "date-fns";
import { getHealthKitData } from "../../helpers/getHealthKitData";
import {
  useCreateHealthKitCache,
  useHealthKitCache,
} from "../../hooks/useHealthKitCache";

export function SyncHealthKit() {
  const [syncing, setSyncing] = useState(false);
  const { data: caches = [] } = useHealthKitCache();
  const createCache = useCreateHealthKitCache();

  if (Capacitor.getPlatform() !== "ios") {
    return null;
  }

  const handleSync = async () => {
    setSyncing(true);

    // Sync last 7 days
    for (let i = 0; i < 7; i++) {
      const date = subDays(new Date(), i);
      const dayString = date.toLocaleDateString();

      // Skip if already cached
      if (caches.find((c) => c.day === dayString)) {
        continue;
      }

      const data = await getHealthKitData(date);

      if (data.activeCalories > 0 || data.baseCalories > 0) {
        await createCache.mutateAsync({
          day: dayString,
          activeCalories: data.activeCalories,
          baseCalories: data.baseCalories,
          weight: data.weight > 0 ? data.weight : undefined,
          steps: data.steps > 0 ? data.steps : undefined,
        });
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
