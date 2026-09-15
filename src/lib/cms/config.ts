export function readCmsConfig(env: Record<string, string | undefined>) {
  const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = env.NEXT_PUBLIC_SANITY_DATASET?.trim();
  if (!projectId && !dataset) return null;
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
