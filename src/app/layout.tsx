import type { Metadata } from "next";
import "./tailwind.css";
import "../app/globals.scss";

export const metadata: Metadata = {
  title: "ITLegend – Course Player",
  description:
    "تابع تقدمك في الكورس واستمتع بتجربة تعلم متكاملة مع ITLegend.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
