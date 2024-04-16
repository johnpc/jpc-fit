import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Food: a
    .model({
      name: a.string(),
      calories: a.integer().required(),
      protein: a.integer(),
      day: a.string().required(),
    })
    .secondaryIndexes((index) => [index("day")])
    .authorization([a.allow.owner()]),
  Goal: a
    .model({
      dietCalories: a.integer().required(),
    })
    .authorization([a.allow.owner()]),
  QuickAdd: a
    .model({
      name: a.string().required(),
      calories: a.integer().required(),
      protein: a.integer(),
      icon: a.string().required(),
    })
    .authorization([a.allow.owner()]),
  Weight: a
    .model({
      currentWeight: a.integer().required(),
    })
    .authorization([a.allow.owner()]),
  Height: a
    .model({
      currentHeight: a.integer().required(),
    })
    .authorization([a.allow.owner()]),
  Preferences: a
    .model({
      hideProtein: a.boolean(),
      hideSteps: a.boolean(),
    })
    .authorization([a.allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
