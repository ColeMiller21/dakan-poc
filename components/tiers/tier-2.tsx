"use client";
import withNFTGate from "@/components/nft-gate";

const Tier2 = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-[150px] aspect-square flex justify-center items-center">
      Tier 2
    </div>
  );
};

const WrappedTier2 = withNFTGate(Tier2, 2);

export default WrappedTier2;
