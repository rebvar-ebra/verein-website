/** Keep the association's two current projects in their requested display order. */
export function orderProjects<T extends { id: string }>(projects: T[]): T[] {
  const priority = (id: string) =>
    id === "anahita" ? 0 : id === "dalia" ? 1 : 2;
  return [...projects].sort((a, b) => priority(a.id) - priority(b.id));
}
