"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserDropDown } from "@/components/user-dropdown";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import useCheckBalance from "@/hooks/useCheckBalance";

export function SiteHeader() {
  const { theme } = useTheme();
  const address = useAddress();
  const { hasNFTs, loading: balanceCheckLoading } = useCheckBalance();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Filter through siteConfig.mainNav and remove the "Claim" link if the user has no NFTs
  const gatedMainNav = siteConfig.mainNav.filter((item) => {
    if (item.title === "Claim" && (!hasNFTs || balanceCheckLoading)) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos < 130) return;
      setIsVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={{ y: isVisible ? 0 : -120 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-40 w-full border-b bg-background ${
        isVisible && "shadow-bottom"
      }`}
    >
      <div className="container px-4 lg:px-8 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={gatedMainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <div className="hidden lg:block">
              <ConnectWallet
                theme={theme as "light" | "dark"}
                btnTitle="Login"
                modalTitle="Login to Dakan"
                className={`${!address ? `custom-btn-main` : ""}`}
              />
            </div>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="hidden"
            >
              <div
                className={`${buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}`}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
            <div className="hidden lg:flex justify-center items-center ml-4">
              <UserDropDown />
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
