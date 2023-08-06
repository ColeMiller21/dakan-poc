import { DotGrid } from "@/components/dot-grid";
import { Reveal } from "@/components/animation/reveal";
import { Landing } from "@/components/landing/landing";
import { MissionStatement } from "@/components/landing/mission-statement";
import { PhygitalBanner } from "@/components/landing/phygital-banner";
import { Approach } from "@/components/landing/approach";
import { HowItWorks } from "@/components/landing/how-it-works";
import { JoinUs } from "@/components/landing/join-us";

export default function Home() {
  return (
    <section className="w-full flex flex-col justify-center gap-6 pb-8 pt-6 md:py-10 relative min-h-screen-minus-navbar">
      {/* <div className="flex flex-col items-center gap-6 z-10">
        <Reveal>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl lg:text-7xl text-shadow">
            Dakan POC Marketplace
          </h1>
        </Reveal>
        <Reveal>
          <div className="text-3xl font-extrabold leading-tight tracking-tighter lg:text-4xl text-center flex flex-col ">
            <span className="text-shadow">Where Physical and Digital</span>{" "}
            <span className="text-shadow">Collect Together</span>
          </div>
        </Reveal>
      </div> */}
      <Landing />
      <MissionStatement />
      <PhygitalBanner />
      <Approach />
      <HowItWorks />
      <JoinUs />
      {/* <DotGrid /> */}
    </section>
  );
}
