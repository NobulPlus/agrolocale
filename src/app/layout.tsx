import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agrolocale — Nigeria's Premier Agro-Realty Platform",
  description:
    "Discover, verify, and acquire premium agricultural land across Nigeria. Agrolocale connects farmers and investors with verified farmland listings.",

  verification: {
    google: "iiBB7Byncsb7a7ac97-rP_iRL1DEhX8C3XjYnF9WV3o",
  },
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
