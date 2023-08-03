"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NavItem } from "@/types/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import { useTheme } from "next-themes";

interface MainNavProps {
  items?: NavItem[];
}

const sidebar = {
  open: { x: "-16px" },
  closed: { x: "-100%" },
};

export function MainNav({ items }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme } = useTheme();
  const address = useAddress();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <>
      <div className="flex gap-6 items-center md:gap-10">
        <div className="block lg:hidden">
          {showMobileMenu ? (
            <Icons.close className="h-6 w-6" onClick={toggleMobileMenu} />
          ) : (
            <Icons.menu className="h-6 w-6" onClick={toggleMobileMenu} />
          )}
        </div>
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo className=" h-20 w-20" />
        </Link>
        {items?.length ? (
          <nav className="hidden lg:flex gap-6">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}
      </div>
      {showMobileMenu && (
        <motion.div
          className="absolute h-screen w-screen top-[60px] left-0 bg-background flex flex-col items-center gap-12 py-6"
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebar}
          transition={{ damping: 300 }}
        >
          <ConnectWallet
            theme={theme as "light" | "dark"}
            btnTitle="Login"
            modalTitle="Login to Dakan"
            className={`${!address ? `custom-btn-main` : ""}`}
          />
          {items?.length ? (
            <nav className="lg:hidden flex flex-col items-center gap-6">
              {items?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center text-[2rem] font-bold text-muted-foreground",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
        </motion.div>
      )}
    </>
  );
}
