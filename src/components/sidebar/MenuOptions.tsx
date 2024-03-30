"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, ChevronsUpDown, Compass, Menu, PlusCircleIcon } from "lucide-react";
import clsx from "clsx";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import Link from "next/link";
import { useModal } from "@/providers/modal-provider";
import { Separator } from "../ui/separator";
import { icons } from "@/constants";
import CustomModal from "../global/custom-modal";
import SubAccountDetails from "../forms/subaccount-details";
import { Agency } from "@prisma/client";

const MenuOptions = ({
  details,
  id,
  sidebarLogo,
  sidebarOpt,
  subAccounts,
  user,
  defaultOpen,
  sidebarOpened = true,
  setSidebarOpened = () => {},
}: SideBarProps) => {
  const { setOpen } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  const openState = useMemo(() => (defaultOpen ? { open: true } : {}), [defaultOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;
  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger asChild className="absolute left-4 top-4 z-[100] md:!hidden flex">
        <Button variant="outline" size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        showX={!defaultOpen}
        side={"left"}
        className={clsx("bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6", {
          "hidden md:inline-block z-0 w-[100px]": !sidebarOpened && defaultOpen,
          "hidden md:inline-block z-0 w-[300px]": defaultOpen,
          "inline-block md:hidden z-[100] w-full": !defaultOpen,
        })}
      >
        <Button
          id="sidebarToggle"
          onClick={() => setSidebarOpened(!sidebarOpened)}
          className="absolute right-[-10px] top-[90%] transform -translate-y-1/2 py-2 px-2 rounded-l-full bg-muted 
          hover:bg-dark-tremor-background-subtle transition-all z-[100] shadow-sm border text-muted-foreground"
        >
          {sidebarOpened ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </Button>
        <div>
          <AspectRatio ratio={sidebarOpened ? 16 / 5 : 1 / 1}>
            <Image src={sidebarLogo} alt="Sidebar Logo" fill className="rounded-md object-contain" />
          </AspectRatio>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-full my-4 flex items-center justify-between py-8" variant="ghost">
                <div className="flex items-center text-left gap-2">
                  <Compass />
                  {sidebarOpened && (
                    <div className="flex flex-col">
                      {details.name}
                      <span className="text-muted-foreground">{details.address}</span>
                    </div>
                  )}
                </div>
                {sidebarOpened && (
                  <div>
                    <ChevronsUpDown size={16} className="text-muted-foreground" />
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-80 mt-4 z-[200]">
              <Command className="rounded-lg">
                <CommandInput placeholder="Search Accounts..." />
                <CommandList className="pb-16">
                  <CommandEmpty> No results found</CommandEmpty>
                  {(user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") && user?.Agency && (
                    <CommandGroup heading="Agency">
                      <CommandItem className="!bg-transparent my-2 text-primary broder-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                        {defaultOpen ? (
                          <Link href={`/agency/${user?.Agency?.id}`} className="flex gap-4 w-full h-full">
                            <div className="relative w-16">
                              <Image
                                src={user?.Agency?.agencyLogo}
                                alt="Agency Logo"
                                fill
                                className="rounded-md object-contain"
                              />
                            </div>
                            <div className="flex flex-col flex-1">
                              {user?.Agency?.name}
                              <span className="text-muted-foreground">{user?.Agency?.address}</span>
                            </div>
                          </Link>
                        ) : (
                          <SheetClose asChild>
                            <Link href={`/agency/${user?.Agency?.id}`} className="flex gap-4 w-full h-full">
                              <div className="relative w-16">
                                <Image
                                  src={user?.Agency?.agencyLogo}
                                  alt="Agency Logo"
                                  fill
                                  className="rounded-md object-contain"
                                />
                              </div>
                              <div className="flex flex-col flex-1">
                                {user?.Agency?.name}
                                <span className="text-muted-foreground">{user?.Agency?.address}</span>
                              </div>
                            </Link>
                          </SheetClose>
                        )}
                      </CommandItem>
                    </CommandGroup>
                  )}
                  <CommandGroup heading="Accounts">
                    {subAccounts.length > 0 ? (
                      subAccounts.map((subaccount) => (
                        <CommandItem key={subaccount.id}>
                          {defaultOpen ? (
                            <Link href={`/subaccount/${subaccount.id}`} className="flex gap-4 w-full h-full">
                              <div className="relative w-16">
                                <Image
                                  src={subaccount.subAccountLogo}
                                  alt="subaccount Logo"
                                  fill
                                  className="rounded-md object-contain"
                                />
                              </div>
                              <div className="flex flex-col flex-1">
                                {subaccount.name}
                                <span className="text-muted-foreground">{subaccount.address}</span>
                              </div>
                            </Link>
                          ) : (
                            <SheetClose asChild>
                              <Link href={`/subaccount/${subaccount.id}`} className="flex gap-4 w-full h-full">
                                <div className="relative w-16">
                                  <Image
                                    src={subaccount.subAccountLogo}
                                    alt="subaccount Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>
                                <div className="flex flex-col flex-1">
                                  {subaccount.name}
                                  <span className="text-muted-foreground">{subaccount.address}</span>
                                </div>
                              </Link>
                            </SheetClose>
                          )}
                        </CommandItem>
                      ))
                    ) : (
                      <div className="flex items-center justify-center w-full">
                        <span className="text-muted-foreground text-center text-sm">No Accounts</span>
                      </div>
                    )}
                  </CommandGroup>
                </CommandList>
                {(user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") && (
                  <SheetClose>
                    <Button
                      className="w-full flex gap-2"
                      onClick={() => {
                        setOpen(
                          <CustomModal
                            title="Create A Subaccount"
                            subheading="You can switch between your agency account and the subaccount from the sidebar"
                          >
                            <SubAccountDetails
                              agencyDetails={user?.Agency as Agency}
                              userId={user?.id as string}
                              userName={user?.name}
                            />
                          </CustomModal>
                        );
                      }}
                    >
                      <PlusCircleIcon size={15} />
                      Create Sub Account
                    </Button>
                  </SheetClose>
                )}
              </Command>
            </PopoverContent>
          </Popover>

          <p className={`text-muted-foreground text-xs mb-2 ${!sidebarOpened && "text-center"}`}>MENU LINKS</p>

          <Separator className="mb-4" />

          <nav className={`relative ${!sidebarOpened && "flex flex-col justify-center items-center"}`}>
            <Command className="rounded-lg overflow-visible bg-transparent">
              {<CommandInput placeholder={sidebarOpened ? "Search..." : ""} />}
              <CommandList className="py-4 overflow-visible">
                <CommandEmpty>No Results Found</CommandEmpty>
                <CommandGroup className="overflow-visible">
                  {sidebarOpt.map((sidebarOptions) => {
                    let val;
                    const result = icons.find((icon) => icon.value === sidebarOptions.icon);
                    if (result) {
                      val = <result.path />;
                    }
                    return (
                      <CommandItem
                        key={sidebarOptions.id}
                        className={`${sidebarOpened ? "md:w-[320px]" : "md:w-[100px]"} w-full`}
                      >
                        <Link
                          href={sidebarOptions.link}
                          className={`flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full ${
                            sidebarOpened ? "w-[320px]" : "w-[100px]"
                          }`}
                        >
                          {val}
                          {sidebarOpened && <span>{sidebarOptions.name}</span>}
                        </Link>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
