"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";

const appleSDGothicNeo = localFont({
  src: [
    {
      path: "../public/fonts/AppleSDGothicNeoT.ttf",
      style: "normal",
      weight: "100",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoUL.ttf",
      style: "normal",
      weight: "200",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoL.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoR.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoM.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoSB.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoB.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoEB.ttf",
      style: "normal",
      weight: "800",
    },
    {
      path: "../public/fonts/AppleSDGothicNeoH.ttf",
      style: "normal",
      weight: "900",
    },
  ],
});

const theme = {
  font: {
    heading: appleSDGothicNeo.style.fontFamily,
    body: appleSDGothicNeo.style.fontFamily,
  },
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
