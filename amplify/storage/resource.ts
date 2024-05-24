import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "jpcFitStorage",
  access: (allow) => ({
    "images/*": [allow.authenticated.to(["read", "write"])],
  }),
});
