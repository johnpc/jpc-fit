import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { storage } from "./storage/resource";
import { getSteps } from "./function/resource";

const backend = defineBackend({
  auth,
  data,
  storage,
  getSteps,
});

const healthKitCacheTable = backend.data.resources.tables["HealthKitCache"];
healthKitCacheTable.grantReadData(backend.getSteps.resources.lambda);
backend.getSteps.addEnvironment(
  "HEALTHKITCACHE_TABLE_NAME",
  healthKitCacheTable.tableName,
);
