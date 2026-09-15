export function readCmsConfig(env: Record<string, string | undefined>) {
  const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = env.NEXT_PUBLIC_SANITY_DATASET?.trim();
  // These public identifiers are safe to include in deployment builds.
  // Keep partial overrides invalid to avoid connecting to an unintended dataset.
  if (!projectId && !dataset)
    return {projectId: "x34rtnfv", dataset: "production", apiVersion: "2026-03-01"};
  if (
    !projectId ||
    !dataset ||
    !/^[a-z0-9]+$/.test(projectId) ||
    !/^[a-z0-9_-]+$/.test(dataset)
  )
    throw new Error(
      "Sanity configuration requires a valid project ID and dataset.",
    );
  return { projectId, dataset, apiVersion: "2026-03-01" };
}
