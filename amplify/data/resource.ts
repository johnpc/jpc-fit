import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import {
  getCurrentDate,
  getEverything,
  getFoods,
  getHeights,
  getSteps,
  getWeights,
} from "../function/resource";

const schema = a
  .schema({
    Food: a
      .model({
        name: a.string(),
        calories: a.integer().required(),
        protein: a.integer(),
        day: a.string().required(),
        notes: a.string(),
        photos: a.string().array(),
      })
      .secondaryIndexes((index) => [index("day")])
      .authorization((allow) => [allow.owner()]),
    Goal: a
      .model({
        dietCalories: a.integer().required(),
      })
      .authorization((allow) => [allow.owner()]),
    QuickAdd: a
      .model({
        name: a.string().required(),
        calories: a.integer().required(),
        protein: a.integer(),
        icon: a.string().required(),
      })
      .authorization((allow) => [allow.owner()]),
    Weight: a
      .model({
        currentWeight: a.integer().required(),
      })
      .authorization((allow) => [allow.owner()]),
    Height: a
      .model({
        currentHeight: a.integer().required(),
      })
      .authorization((allow) => [allow.owner()]),
    HealthKitCache: a
      .model({
        activeCalories: a.float().required(),
        baseCalories: a.float().required(),
        weight: a.float(),
        steps: a.float(),
        day: a.string().required(),
      })
      .authorization((allow) => [allow.owner()]),
    Preferences: a
      .model({
        hideProtein: a.boolean(),
        hideSteps: a.boolean(),
      })
      .authorization((allow) => [allow.owner()]),

    StringType: a.customType({
      value: a.string(),
    }),
    getWeights: a
      .query()
      .arguments({ ignoreThisArgument: a.string() })
      .returns(a.ref("StringType"))
      .handler(a.handler.function(getWeights))
      .authorization((allow) => allow.authenticated()),
    getHeights: a
      .query()
      .arguments({ ignoreThisArgument: a.string() })
      .returns(a.ref("StringType"))
      .handler(a.handler.function(getHeights))
      .authorization((allow) => allow.authenticated()),
    getFoods: a
      .query()
      .arguments({ ignoreThisArgument: a.string() })
      .returns(a.ref("StringType"))
      .handler(a.handler.function(getFoods))
      .authorization((allow) => allow.authenticated()),
    getCurrentDate: a
      .query()
      .arguments({ ignoreThisArgument: a.string() })
      .returns(a.ref("StringType"))
      .handler(a.handler.function(getCurrentDate))
      .authorization((allow) => allow.authenticated()),
    getEverything: a
      .query()
      .arguments({ userId: a.string().required() })
      .returns(a.ref("StringType"))
      .handler(a.handler.function(getEverything))
      .authorization((allow) => allow.authenticated()),
    getSteps: a
      .query()
      .arguments({
        apiKey: a.string().required(),
        userId: a.string().required(),
      })
      .returns(a.ref("StringType"))
      .handler(a.handler.function(getSteps))
      .authorization((allow) => allow.publicApiKey()),
  })
  .authorization((allow) => [
    allow.resource(getCurrentDate),
    allow.resource(getHeights),
    allow.resource(getWeights),
    allow.resource(getFoods),
    allow.resource(getEverything),
    allow.resource(getSteps),
  ]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
  },
});
