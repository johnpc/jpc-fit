import type { Schema } from "../data/resource";

export const handler: Schema["getCurrentDate"]["functionHandler"] =
  async () => {
    return {
      value: new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      }),
    };
  };
