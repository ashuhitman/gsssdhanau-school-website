import type { Metadata } from "next";

import "./globals.css";

import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "PM SHRI GSSS DHANAU",
    template: "%s | PM SHRI GSSS DHANAU",
  },

  description:
    "Official website of PM SHRI Government Senior Secondary School, Dhanau, Barmer, Rajasthan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}