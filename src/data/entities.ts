import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "../../amplify_outputs.json";
import { Schema } from "../../amplify/data/resource";
import { getCurrentUser } from "aws-amplify/auth";

Amplify.configure(config);
const client = generateClient<Schema>({
  authMode: "userPool",
});

export type PreferencesEntity = {
  id?: string;
  hideProtein?: boolean | null;
  hideSteps?: boolean | null;
};

export type HealthKitCacheEntity = {
  activeCalories: number;
  baseCalories: number;
  weight?: number;
  steps?: number;
  day: Date;
};

export const createHealthKitCache = async (
  cacheEntity: HealthKitCacheEntity,
): Promise<void> => {
  const currentUser = await getCurrentUser();
  const dayString =
    cacheEntity.day.toLocaleDateString(undefined, {
      month: "numeric",
    }) +
    "-" +
    cacheEntity.day.toLocaleDateString(undefined, {
      day: "numeric",
    }) +
    "-" +
    cacheEntity.day.toLocaleDateString(undefined, {
      year: "numeric",
    });

  const createdHealthKitCacheEntity = await client.models.HealthKitCache.create(
    {
      ...cacheEntity,
      id: currentUser.userId + dayString,
      day: cacheEntity.day.toLocaleDateString(),
    },
  );
  console.log({
    createdHealthKitCacheEntity: createdHealthKitCacheEntity?.data,
    errors: createdHealthKitCacheEntity?.errors,
  });
};
