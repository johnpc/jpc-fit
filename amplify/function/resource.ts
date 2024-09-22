import { defineFunction } from "@aws-amplify/backend";

export const getWeights = defineFunction({
  name: "getWeights",
  entry: "./getWeights.ts",
});
export const getHeights = defineFunction({
  name: "getHeights",
  entry: "./getHeights.ts",
});
export const getFoods = defineFunction({
  name: "getFoods",
  entry: "./getFoods.ts",
});
export const getCurrentDate = defineFunction({
  name: "getCurrentDate",
  entry: "./getCurrentDate.ts",
});
export const getEverything = defineFunction({
  name: "getEverything",
  entry: "./getEverything.ts",
});
