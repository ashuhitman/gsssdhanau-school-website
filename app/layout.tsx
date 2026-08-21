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

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("school-theme");

    var theme =
      stored === "dark" || stored === "light"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    var root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  } catch (error) {
    // Fall back to light mode.
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>

      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}