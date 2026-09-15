import { defineCliConfig } from "sanity/cli";
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID?.trim() || "x34rtnfv",
    dataset: process.env.SANITY_STUDIO_DATASET?.trim() || "production",
  },
});
