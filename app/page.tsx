import { DotGrid } from "@/components/dot-grid";
import { Reveal } from "@/components/animation/reveal";

export default function Home() {
  return (
    <section className="container grid items-center justify-center gap-6 pb-8 pt-6 md:py-10 relative min-h-screen-minus-navbar">
      <div className="flex max-w-[980px] flex-col items-center gap-6 z-10">
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
      </div>
      {/* <DotGrid /> */}
    </section>
  );
}
