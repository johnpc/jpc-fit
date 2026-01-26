import type { Schema } from "../data/resource";
import { env } from "$amplify/env/getSteps";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

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
    new ScanCommand({
      TableName: env.HEALTHKITCACHE_TABLE_NAME,
      FilterExpression: "contains(#o, :uid) AND #d = :day",
      ExpressionAttributeNames: { "#o": "owner", "#d": "day" },
      ExpressionAttributeValues: { ":uid": userId, ":day": today },
    }),
  );

  console.log("DDB response:", JSON.stringify(response.Items));

  const todayCache = response.Items?.[0];
  return { value: JSON.stringify({ steps: todayCache?.steps ?? 0 }) };
};
