import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
export const metadata: Metadata = {
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
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${geistSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
