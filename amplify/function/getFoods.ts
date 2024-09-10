import type { Schema } from "../data/resource";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { env } from "$amplify/env/getFoods";
import { listFoods } from "./queries";

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT,
        region: env.AWS_REGION,
        defaultAuthMode: "identityPool",
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            sessionToken: env.AWS_SESSION_TOKEN,
          },
        }),
        clearCredentialsAndIdentityId: () => {
          /* noop */
        },
      },
    },
  },
);
const client = generateClient<Schema>();

export const handler: Schema["getWeights"]["functionHandler"] = async () => {
  const foods = await client.graphql({
    query: listFoods,
  });
  console.log({ foods: foods.data.listFoods.items, errors: foods.errors });
  return { value: JSON.stringify(foods.data.listFoods.items) };
};
