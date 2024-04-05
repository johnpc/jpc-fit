import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Food: a
    .model({
      calories: a.integer().required(),
      day: a.string().required(),
    })
    .secondaryIndexes((index) => [index("day")])
    .authorization([a.allow.owner()]),
  Goal: a
    .model({
      dietCalories: a.integer().required(),
    })
    .authorization([a.allow.owner()]),
  Weight: a
    .model({
      currentWeight: a.integer().required(),
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
