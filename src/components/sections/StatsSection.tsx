import { BrandMark } from "@/components/ui/arrow";
export function StatsSection({
  values = [],
  labels = ["Läuft seit", "Unser Ziel", "Gemeinsam geschafft"],
}: {
  values?: (string | null | undefined)[];
  labels?: string[];
}) {
  return (
    <dl className="mx-auto grid max-w-3xl gap-8 px-6 py-8 text-center sm:grid-cols-3">
      {labels.map((label, index) => (
        <div key={label}>
          <BrandMark className="mx-auto mb-4 h-8 w-8 text-olive" />
          <dt className="text-lg font-medium">{label}</dt>
          <dd className="mt-2 text-sm text-muted">
            {values[index] || "Angaben folgen"}
          </dd>
        </div>
      ))}
    </dl>
  );
}
