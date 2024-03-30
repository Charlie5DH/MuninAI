import Navigation from "@/components/site/navigation/Navigation";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className="h-full mb-20">
        <Navigation />
        <TracingBeam className="relative mx-32">{children}</TracingBeam>
      </main>
    </ClerkProvider>
  );
};

export default SiteLayout;
