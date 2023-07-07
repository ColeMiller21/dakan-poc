"use client";
import React from "react";
import { useContract, useAddress, useOwnedNFTs } from "@thirdweb-dev/react";
import { NFT_ADDRESS } from "@/lib/constants";

function withNFTGate(WrappedComponent: any, requiredNFTs: number) {
  return function NFTGateWrapper() {
    const address = useAddress();
    const { contract } = useContract(NFT_ADDRESS);

    let { data: ownedNFTs, isLoading: ownedNFTsLoading } = useOwnedNFTs(
      contract,
      address
    );

    if (ownedNFTsLoading || ownedNFTs!.length < requiredNFTs) {
      return (
        <div className="relative rounded-lg border bg-card text-card-foreground shadow-sm h-[150px] aspect-square flex justify-center items-center">
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-transparent z-10 flex-col w-full">
            <span className=" text-md font-bold w-full text-center ">
              Access Denied
            </span>

            <span className="w-full text-center text-sm">
              Requires {requiredNFTs} passes to access
            </span>
          </div>
        </div>
      );
    }

    return <WrappedComponent />;
  };
}

export default withNFTGate;
