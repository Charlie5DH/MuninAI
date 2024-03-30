import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@uploadthing/react/styles.css";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnarToaster } from "@/components/ui/sonner";
import ModalProvider from "@/providers/modal-provider";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MuninAI",
  description: "Run Your Whole Plant, in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={font.className} suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange>
          <ModalProvider>{children}</ModalProvider>
          <Toaster />
          <SonnarToaster position="bottom-left" />
        </ThemeProvider>
      </body>
    </html>
  );
}
