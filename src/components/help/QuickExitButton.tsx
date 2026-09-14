"use client";
export function QuickExitButton() {
  return (
    <button
      type="button"
      onClick={() => window.location.replace("https://www.google.com/")}
      className="fixed bottom-4 right-4 z-50 min-h-12 max-w-[calc(100%-2rem)] rounded-full border-2 border-white bg-forest px-5 py-3 text-sm font-semibold text-white shadow-lg"
    >
      Seite schnell verlassen ↗
    </button>
  );
}
