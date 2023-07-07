"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import { useDisconnect, useAddress, useBalance } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

export function UserDropDown() {
  const address = useAddress();
  const { data: tokenBalance, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  const disconnect = useDisconnect();

  const formatAddress = (address: string | undefined) => {
    if (address === undefined) return;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/images/dakan.png" alt="dakan user" />
            <AvatarFallback>TU</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {isLoading ? (
                <Skeleton className="w-[70px] h-[16px] rounded-full" />
              ) : (
                `${tokenBalance?.displayValue} ETH`
              )}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {isLoading ? (
                <Skeleton className="w-[100px] h-[14px] rounded-full" />
              ) : (
                formatAddress(address)
              )}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnect}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
