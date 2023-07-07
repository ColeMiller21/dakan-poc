"use client";
import withNFTGate from "@/components/nft-gate";

const Tier1 = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-[150px] aspect-square flex justify-center items-center">
      Tier 1
    </div>
  );
};

const WrappedTier1 = withNFTGate(Tier1, 1);

export default WrappedTier1;
// export default Tier1;
