import type { Schema } from "../data/resource";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { env } from "$amplify/env/getSteps";
import { listHealthKitCaches } from "./graphql/queries";

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT,
        region: env.AWS_REGION,
        defaultAuthMode: "iam",
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
        clearCredentialsAndIdentityId: () => {},
      },
    },
  },
);
const client = generateClient<Schema>();

export const handler: Schema["getSteps"]["functionHandler"] = async (args) => {
  const apiKey = args.arguments.apiKey;
  if (apiKey !== env.STEPS_API_KEY) {
    return { value: JSON.stringify({ error: "Unauthorized" }) };
  }

  const userId = args.arguments.userId;
  const now = new Date();
  // Use EST/EDT timezone (UTC-5)
  const estOffset = -5 * 60;
  const localTime = new Date(
    now.getTime() + (estOffset + now.getTimezoneOffset()) * 60000,
  );
  const today = `${localTime.getMonth() + 1}/${localTime.getDate()}/${localTime.getFullYear()}`;

  console.log("Querying for userId:", userId, "day:", today);

  const response = await client.graphql({
    query: listHealthKitCaches,
    variables: {
      filter: { owner: { contains: userId }, day: { eq: today } },
      limit: 1,
    },
  });

  const caches = response.data?.listHealthKitCaches?.items || [];
  console.log("DDB response:", JSON.stringify(caches));

  const todayCache = caches[0];

  return { value: JSON.stringify({ steps: todayCache?.steps ?? 0 }) };
};
