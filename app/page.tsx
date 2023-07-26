import { LoginState } from "@/components/login-state";
import { NftClaim } from "@/components/nft-claim";
import WrappedTier1 from "@/components/tiers/tier-1";
import WrappedTier2 from "@/components/tiers/tier-2";
import WrappedTier3 from "@/components/tiers/tier-3";
import { DotGrid } from "@/components/dot-grid";

export default function Home() {
  return (
    <section className="container grid items-center justify-center gap-6 pb-8 pt-6 md:py-10 relative">
      <div className="flex max-w-[980px] flex-col items-center gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Dakan Proof Of Concept
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-start justify-center gap-6">
        {/* <LoginState /> */}
        <NftClaim />
      </div>
      <div className="flex gap-4 max-w-[980px] justify-center">
        <WrappedTier1 />
        <WrappedTier2 />
        <WrappedTier3 />
      </div>
    </section>
  );
}
