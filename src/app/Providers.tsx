// app/providers.tsx
"use client"; // This must be a client component

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function Providers({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem {...props}>
      {children}
    </NextThemesProvider>
  );
}