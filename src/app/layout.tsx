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
const houschka = localFont({
  src: [
    { path: "./fonts/houschka-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/houschka-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-houschka",
  display: "swap",
});
const previewMetadata: Metadata = {
  title: {
    default: "Neuer Tag – Miteinander. Füreinander.",
    template: "%s | Neuer Tag",
  },
  description:
    "Designvorschau für Neuer Tag: Gemeinschaft entdecken, Projekte kennenlernen und gemeinsam etwas bewegen.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Neuer Tag – Miteinander. Füreinander.",
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
      className={`${openSans.variable} ${houschka.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
