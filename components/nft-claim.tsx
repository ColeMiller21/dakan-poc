"use client";
import { useState, useContext } from "react";

import { NFT_ADDRESS, PAPER_NFT_CONTRACT } from "@/lib/constants";
import {
  ThirdwebNftMedia,
  useContract,
  usePaperWalletUserEmail,
  useAddress,
  useOwnedNFTs,
  useNFT,
  ConnectWallet,
  Web3Button,
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
import UserContext from "@/context/user-context";

export function NftClaim() {
  const { user, loading, isLoggedIn } = useContext(UserContext);

  const address = useAddress();
  const { theme } = useTheme();
  const { data: email } = usePaperWalletUserEmail();
  const { contract } = useContract(NFT_ADDRESS);
  const { data: ownedNFTs, isLoading: ownedNFTsLoading } = useOwnedNFTs(
    contract,
    address
  );

  const { data: nft, isLoading: nftLoading, error } = useNFT(contract, 0);

  // Handle payment success state
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const handlePaymentSuccess = () => {
    setPaymentSuccessful(true);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center my-14 gap-[2rem]">
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
              {ownedNFTs !== undefined && isLoggedIn && (
                <span>
                  Owned Count: {ownedNFTs[0] ? ownedNFTs[0].quantityOwned : 0}
                </span>
              )}
            </p>
          </>
        )}

        {address && isLoggedIn ? (
          <div className="flex gap-4">
            <Web3Button
              contractAddress={NFT_ADDRESS}
              action={async (contract) => {
                await contract.erc1155.claim(0, 1);
              }}
              className="custom-btn-main"
            >
              Pay With Crypto
            </Web3Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button>Pay With Card</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Pay With Card</DialogTitle>
                  <DialogDescription>
                    {!paymentSuccessful ? (
                      <div className="my-8 flex flex-col">
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
                        <div className="flex flex-col items-center justify-center">
                          <h2 className="font-extrabold">Test Card Creds</h2>
                          <p>
                            <span className="font-bold">Card: </span> 4242 4242
                            4242 4242
                          </p>
                          <p>
                            <span className="font-bold">Exp: </span> 4/24 -{" "}
                            <span className="font-bold">CVC: </span> 123 -{" "}
                            <span className="font-bold">Zip: </span> 12345
                          </p>
                        </div>
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
            className="custom-btn-main"
          />
        )}
      </div>
    </div>
  );
}
