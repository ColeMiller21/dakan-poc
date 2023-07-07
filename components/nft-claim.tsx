"use client";
import { useState } from "react";
import Image from "next/image";

import { NFT_ADDRESS, PAPER_NFT_CONTRACT } from "@/lib/constants";
import {
  ThirdwebNftMedia,
  useContract,
  useNFTs,
  usePaperWalletUserEmail,
  useAddress,
  useOwnedNFTs,
  useNFT,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { useTheme } from "next-themes";
import { Skeleton } from "./ui/skeleton";
import { CheckoutWithCard } from "@paperxyz/react-client-sdk";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const NFT_SIZE = 225;

export function NftClaim() {
  const address = useAddress();
  const { theme } = useTheme();
  const { data: email } = usePaperWalletUserEmail();
  const { contract } = useContract(NFT_ADDRESS);
  const { data: ownedNFTs, isLoading: ownedNFTsLoading } = useOwnedNFTs(
    contract,
    address
  );
  console.log({ ownedNFTs });
  const { data: nft, isLoading: nftLoading, error } = useNFT(contract, 0);

  // Handle payment success state
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const handlePaymentSuccess = () => {
    setPaymentSuccessful(true);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row my-14 gap-[2rem]">
      {nftLoading ? (
        <Skeleton className={`w-[225px] h-[225px]`} />
      ) : (
        <ThirdwebNftMedia
          metadata={nft!.metadata}
          className="rounded-md shadow-md"
        />
      )}

      <div className="flex flex-col gap-6 justify-center">
        {nftLoading ? (
          <>
            <Skeleton className={`w-[125px] h-[24px]`} />
            <Skeleton className={`w-[150px] h-[20px]`} />
          </>
        ) : (
          <>
            <h6 className="font-extrabold text-2xl">{nft?.metadata.name}</h6>
            <p className="text-foreground text-md">
              {nft?.metadata.description}
            </p>
            <p className="font-extrabold">
              {ownedNFTs !== undefined && (
                <span>Owned Count: {ownedNFTs[0].quantityOwned}</span>
              )}
            </p>
          </>
        )}

        {address && email ? (
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Pay With Crypto</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Pay With Crypto</DialogTitle>
                  <DialogDescription>H</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Pay With Card</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Pay With Card</DialogTitle>
                  <DialogDescription>
                    {!paymentSuccessful ? (
                      <div className="my-8">
                        <CheckoutWithCard
                          configs={{
                            contractId: PAPER_NFT_CONTRACT, // from Paper dashboard
                            walletAddress: address,
                            contractArgs: {
                              tokenId: 0,
                            },
                            email: email,
                          }}
                          options={{
                            colorText: theme === "dark" ? "#ffffff" : "#000000",
                          }}
                          onError={(error) => console.error({ error })}
                          onPaymentSuccess={handlePaymentSuccess}
                        />
                      </div>
                    ) : (
                      <div>
                        <h2>Payment Successful!</h2>
                      </div>
                    )}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <ConnectWallet
            theme={theme as "light" | "dark"}
            btnTitle="Login"
            modalTitle="Login to Dakan"
          />
        )}
      </div>
    </div>
  );
}
