import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import {
  getCurrentDate,
  getFoods,
  getHeights,
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
    chat: a.conversation({
      aiModel: a.ai.model("Claude 3.5 Sonnet"),
      systemPrompt: `You are motivating users to lose weight. You answer in three sentences or less, using simple english words.`,
      tools: [
        {
          // query: a.ref("getWeights"),
          query: a.ref("listWeights"),
          description: "How much the user weighs.",
        },
        {
          query: a.ref("listHeights"),
          // query: a.ref("getHeights"),
          description: "How tall the user is.",
        },
        {
          query: a.ref("listFoods"),
          // query: a.ref("getFoods"),
          description: "The food the user has eaten.",
        },
        {
          query: a.ref("getCurrentDate"),
          description: "Provides the current day and time",
        },
      ],
      inferenceConfiguration: {
        maxTokens: 500,
        temperature: 1,
        topP: 0.5,
      },
    }),
  })
  .authorization((allow) => [
    allow.resource(getCurrentDate),
    allow.resource(getHeights),
    allow.resource(getWeights),
    allow.resource(getFoods),
  ]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
