import { getSettings } from "@/lib/cms/content";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const openSans = localFont({
  src: [
    { path: "./fonts/open-sans.ttf", weight: "300 800", style: "normal" },
    {
      path: "./fonts/open-sans-italic.ttf",
      weight: "300 800",
      style: "italic",
    },
  ],
  variable: "--font-open-sans",
  display: "swap",
});
const zedou = localFont({
  src: "./fonts/zedou.woff2",
  weight: "400",
  variable: "--font-zedou",
  display: "swap",
});
const previewMetadata: Metadata = {
  title: {
    default: "Verein – Miteinander. Füreinander.",
    template: "%s | Verein",
  },
  description:
    "Designvorschau für Verein: Gemeinschaft entdecken, Projekte kennenlernen und gemeinsam etwas bewegen.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Verein – Miteinander. Füreinander.",
    description: "Eine Designvorschau für mehr Miteinander.",
    locale: "de_DE",
    type: "website",
  },
};
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  if (!settings) return previewMetadata;
  return {
    ...previewMetadata,
    title: {
      default: settings.defaultSeo?.title || settings.organisationName,
      template: `%s | ${settings.organisationName}`,
    },
    description: settings.defaultSeo?.description,
    openGraph: {
      title: settings.defaultSeo?.title || settings.organisationName,
      description: settings.defaultSeo?.description || undefined,
      locale: "de_DE",
      type: "website",
    },
  };
}
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${openSans.variable} ${zedou.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
