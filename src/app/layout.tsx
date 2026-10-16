import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";

import "./tailwind.css";
import "../app/globals.scss";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  variable: "--font-latin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ITLegend – Course Player",
  description:
    "Track your course progress and enjoy a complete learning experience with ITLegend.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" className={leagueSpartan.variable}>
      <body>{children}</body>
    </html>
  );
}
