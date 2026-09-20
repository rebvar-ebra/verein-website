import Image from "next/image";
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
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/neuer-tag-mark.png"
      alt=""
      aria-hidden="true"
      width={80}
      height={80}
      className={`object-contain ${className}`}
    />
  );
}
