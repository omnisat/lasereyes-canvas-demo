"use client";

import React, { ReactNode } from "react";
import {LaserEyesProvider, TESTNET4} from "@omnisat/lasereyes";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LaserEyesProvider config={{network: TESTNET4}}>{children}</LaserEyesProvider>
    </NextThemesProvider>
  );
}
