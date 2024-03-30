"use client";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { typeWriterHeader } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { pricingCards } from "@/lib/constants";
import PricingCard from "@/components/site/PricingCard";

export default function Home() {
  useGSAP(() => {
    gsap.to("#image", {
      duration: 2,
      marginTop: -45,
      ease: "power2.out",
    });
  }, []);

  return (
    <>
      <section className="flex flex-col pt-36 relative items-center justify-center w-full h-full">
        {/* <div className="grid-pattern" /> */}
        <BackgroundBeams />
        <TypewriterEffectSmooth words={typeWriterHeader} className="text-2xl" />
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold mb-5 text-center md:text-[260px] bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans">
            MuninAI
          </h1>
        </div>
        <div id="image" className="flex justify-center items-center relative md:mt-10">
          <Image
            src={"/assets/preview.png"}
            alt="banner"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="absolute bottom-0 top-[50%] right-0 left-0 bg-gradient-to-t dark:from-background z-10" />
        </div>
      </section>
      <section className="flex justify-center flex-col gap-4 md:!mt-20 mt-[-60px]">
        <h2 className="text-4xl text-center"> Choose what fits you right</h2>

        <p className="text-muted-foreground text-center">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not <br />
          ready to commit you can get started for free.
        </p>
        <div className="flex  justify-center gap-4 flex-wrap mt-6">
          {pricingCards.map((card) => (
            <PricingCard key={card.title} card={card} />
          ))}
        </div>
      </section>
    </>
  );
}
