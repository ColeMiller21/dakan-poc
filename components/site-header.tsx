"use client";

import Link from "next/link";

import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import { UserDropDown } from "@/components/user-dropdown";

export function SiteHeader() {
  const { theme } = useTheme();
  const address = useAddress();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ConnectWallet
              theme={theme as "light" | "dark"}
              btnTitle="Login"
              modalTitle="Login to Dakan"
              className={!address ? `custom-btn-main` : ""}
            />
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
            <div className="flex justify-center items-center ml-4">
              <UserDropDown />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
