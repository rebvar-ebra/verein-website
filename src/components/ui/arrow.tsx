export function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`h-5 w-5 shrink-0 ${className}`}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {diagonal ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}
export function Flower({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 80"
      className={className}
      fill="currentColor"
    >
      <path d="M40 4c12 0 8 19 8 19s12-16 20-8-8 20-8 20 19-4 19 8-19 8-19 8 16 12 8 20-20-8-20-8 4 17-8 17-8-17-8-17-12 16-20 8 8-20 8-20-19 4-19-8 19-8 19-8S4 23 12 15s20 8 20 8-4-19 8-19Z" />
    </svg>
  );
}
