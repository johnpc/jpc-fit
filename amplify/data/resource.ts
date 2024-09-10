import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
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
  Preferences: a
    .model({
      hideProtein: a.boolean(),
      hideSteps: a.boolean(),
    })
    .authorization((allow) => [allow.owner()]),
  chat: a.conversation({
    aiModel: a.ai.model("Claude 3.5 Sonnet"),
    systemPrompt: `You are motivating users to lose weight. You answer in three sentences or less, using simple english words.`,
    tools: [
      {
        query: a.ref("listFoods"),
        description: "The food the user has eaten.",
      },
    ],
    inferenceConfiguration: {
      maxTokens: 500,
      temperature: 1,
      topP: 0.5,
    },
  }),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
