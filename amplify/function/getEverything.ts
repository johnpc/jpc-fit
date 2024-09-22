import type { Schema } from "../data/resource";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { env } from "$amplify/env/getEverything";
import {
  listFoods,
  listGoals,
  listHeights,
  listPreferences,
  listQuickAdds,
  listWeights,
  listHealthKitCaches,
} from "./graphql/queries";

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

export const handler: Schema["getEverything"]["functionHandler"] = async (
  args,
) => {
  const userId = args.arguments.userId;
  const promises = [
    listFoods,
    listHeights,
    listWeights,
    listHealthKitCaches,
    listQuickAdds,
    listGoals,
    listPreferences,
  ].map((query) =>
    client.graphql({
      query,
      variables: {
        filter: {
          owner: {
            eq: userId,
          },
        },
      },
    }),
  );
  const responses = await Promise.all(promises);
  return { value: JSON.stringify(responses) };
};
