import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { storage } from "./storage/resource";
import { getSteps } from "./function/resource";
import * as iam from "aws-cdk-lib/aws-iam";

const backend = defineBackend({
  auth,
  data,
  storage,
  getSteps,
});

const healthKitCacheTable = backend.data.resources.tables["HealthKitCache"];
healthKitCacheTable.grantReadData(backend.getSteps.resources.lambda);
backend.getSteps.resources.lambda.addToRolePolicy(
  new iam.PolicyStatement({
    actions: ["dynamodb:Query"],
    resources: [`${healthKitCacheTable.tableArn}/index/*`],
  }),
);
backend.getSteps.addEnvironment(
  "HEALTHKITCACHE_TABLE_NAME",
  healthKitCacheTable.tableName,
);
