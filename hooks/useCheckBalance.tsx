'use client'
import { useEffect, useState } from 'react';
import { NFT_ADDRESS } from "@/lib/constants";
import {
  useContract,
  useOwnedNFTs,
  useAddress
} from "@thirdweb-dev/react";

export default function useCheckBalance() {
  const [hasNFTs, setHasNFTs] = useState(false);
  const [nftsOwned, setNftsOwned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const address = useAddress();
  const { contract } = useContract(NFT_ADDRESS);
  const { data: ownedNFTs, isLoading: ownedNFTsLoading } = useOwnedNFTs(
    contract,
    address
  );

  useEffect(() => {
    if (!contract || !address) {
      setError('Contract or address is not defined');
      return;
    } else if (contract && address) {
      setError("");
      setLoading(false);
    }

    if (!ownedNFTsLoading) {
      if (ownedNFTs && ownedNFTs?.length > 0) {
        setHasNFTs(true);
        setNftsOwned(ownedNFTs
          .map(nfts => {
            return parseInt(nfts.quantityOwned || "0")
          })
          .reduce(owned => { return owned }));
      } else {
        setHasNFTs(false);
      }
      setLoading(false);
    }
  }, [ownedNFTs, ownedNFTsLoading, contract, address]);

  return { hasNFTs, nftsOwned, loading, error };
}