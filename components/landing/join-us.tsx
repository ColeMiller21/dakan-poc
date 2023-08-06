import React from "react";
import { DotBanner } from "./dot-banner";

export function JoinUs() {
  return (
    <>
      <div className="w-full min-h-auto flex flex-col justify-center items-center mb-[100px] overflow-hidden">
        <DotBanner />
        <div className="w-full md:w-[50%] my-[7rem] ">
          <p className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] text-center font-bold">
            Where physical and digital{" "}
            <span className="text-dakanGreen">collect</span> together.{" "}
            <a
              href="https://form.jotform.com/231286167055154"
              target="_blank"
              className="text-dakanGreen underline"
            >
              Join Us
            </a>
          </p>
        </div>
        <DotBanner />
      </div>
      <div className="w-full aspect-[16/5] relative bg-repeat bg-cover bg-image-pixels bg-center"></div>
    </>
  );
}
