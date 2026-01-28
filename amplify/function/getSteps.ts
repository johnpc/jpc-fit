import type { Schema } from "../data/resource";
import { env } from "$amplify/env/getSteps";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler: Schema["getSteps"]["functionHandler"] = async (args) => {
  const apiKey = args.arguments.apiKey;
  if (apiKey !== env.STEPS_API_KEY) {
    return { value: JSON.stringify({ error: "Unauthorized" }) };
  }

  const userId = args.arguments.userId;
  const now = new Date();
  const estOffset = -5 * 60;
  const localTime = new Date(
    now.getTime() + (estOffset + now.getTimezoneOffset()) * 60000,
  );
  const today = `${localTime.getMonth() + 1}/${localTime.getDate()}/${localTime.getFullYear()}`;

  console.log("Querying for userId:", userId, "day:", today);

  const response = await client.send(
    new QueryCommand({
      TableName: env.HEALTHKITCACHE_TABLE_NAME,
      IndexName: "healthKitCachesByDay",
      KeyConditionExpression: "#d = :day",
      FilterExpression: "contains(#o, :uid)",
      ExpressionAttributeNames: { "#d": "day", "#o": "owner" },
      ExpressionAttributeValues: { ":day": today, ":uid": userId },
    }),
  );

  console.log("DDB response:", JSON.stringify(response.Items));

  const sorted = (response.Items ?? []).sort((a, b) =>
    (b.updatedAt as string).localeCompare(a.updatedAt as string),
  );
  return { value: JSON.stringify({ steps: sorted[0]?.steps ?? 0 }) };
};
