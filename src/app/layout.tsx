import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agrolocale — Nigeria's Premier Agro-Realty Platform",
  description:
    "Discover, verify, and acquire premium agricultural land across Nigeria. Agrolocale connects farmers and investors with verified farmland listings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
