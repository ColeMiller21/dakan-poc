"use client";
import withNFTGate from "@/components/nft-gate";

const Tier3 = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-[150px] aspect-square flex justify-center items-center">
      Tier 3
    </div>
  );
};

const WrappedTier3 = withNFTGate(Tier3, 3);

export default WrappedTier3;
