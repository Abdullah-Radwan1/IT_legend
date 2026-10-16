import type { Metadata } from "next";
import "@fontsource/league-spartan/latin-300.css";
import "@fontsource/league-spartan/latin-500.css";
import "@fontsource/league-spartan/latin-600.css";
import "@fontsource/league-spartan/latin-700.css";
import "./tailwind.css";
import "../app/globals.scss";

export const metadata: Metadata = {
  title: "ITLegend – Course Player",
  description:
    "Track your course progress and enjoy a complete learning experience with ITLegend.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
