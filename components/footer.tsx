import React from "react";
import Image from "next/image";
import { Icons } from "./icons";
import Link from "next/link";
import { LinkList } from "./link-list";
import { Button, buttonVariants } from "./ui/button";

export function Footer() {
  return (
    <div className="w-full min-h-[300px] flex flex-col items-center py-[2.5rem] lg:flex-row lg:justify-center px-4 lg:px-8 overflow-hidden gap-[3rem] border-t">
      <div className="flex flex-col items-center gap-[3rem] lg:hidden">
        <MobileFooter />
      </div>
      <div className="w-full hidden lg:flex items-center justify-between">
        <div className="flex gap-[3rem]">
          <div className="flex flex-col gap-[1rem]">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className=" w-20" />
            </Link>
            <span className="text-[.8rem]">
              &copy; 2023 Dakan. All rights reserved
            </span>
          </div>
          <div className="flex items-start">
            <LinkList />
          </div>
        </div>
        <Link href="https://form.jotform.com/231286167055154" target="_blank">
          <div
            className={`${buttonVariants({
              size: "lg",
              variant: "default",
            })}`}
          >
            Pre-Register
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Footer;

const MobileFooter = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-[3rem]">
        <div className="flex flex-col items-center gap-[1rem]">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className=" h-20 w-20" />
          </Link>
          <span className="text-[.8rem]">
            &copy; 2023 Dakan. All rights reserved
          </span>
        </div>
        <Link href="https://form.jotform.com/231286167055154" target="_blank">
          <div
            className={`${buttonVariants({
              size: "lg",
              variant: "default",
            })}`}
          >
            Pre-Register
          </div>
        </Link>
        <div className="flex items-center">
          <LinkList />
        </div>
      </div>
    </>
  );
};
