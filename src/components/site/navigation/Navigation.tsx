import { ModeToggle } from "@/components/global/ModeToggle";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navigation = ({ user }: { user?: null | User }) => {
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10">
      <aside className="flex items-center gap-2">
        <Image src="/assets/plura-logo.svg" alt="logo" width={40} height={40} />
        <span className="text-xl font-bold">MuninAI.</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[%50] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href={"#"}>Pricing</Link>
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Documentation</Link>
          <Link href={"#"}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link href={"/agency"}>
          <HoverBorderGradient
            containerClassName="rounded-md"
            as="button"
            duration={1}
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            Login
          </HoverBorderGradient>
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
