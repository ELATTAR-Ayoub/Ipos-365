"use client";

import { ThemeProvider } from "next-themes";
import { useRouter, usePathname } from "next/navigation";

// styles
import "./globals.css";
import styles from "@/styles/index";

// components
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

// redux
import { store_0001 } from "../store/store";
import { Provider } from "react-redux";
import { AuthContextProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <head />
      <body
        className={` ${styles.flexStart} flex-col relative bg-background h-screen overflow-x-hidden`}
      >
        <AuthContextProvider>
          <Provider store={store_0001}>
            <ThemeProvider attribute="class">
              <main className={` relative w-full min-h-screen `}>
                {children}
              </main>
              <Toaster />
            </ThemeProvider>
          </Provider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
