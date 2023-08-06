import React from "react";
import Image from "next/image";

export function PhygitalBanner() {
  return (
    <div className="w-full px-4 lg:px-8">
      <div className="w-full bg-[#26252b] min-h-[50vh] flex flex-col items-center gap-[2rem] lg:gap-0 lg:flex-row rounded-lg mb-[100px] p-[3rem] px-4 lg:px-8">
        <div className="w-full md:w-[50%] flex flex-col gap-[1.25rem] text-white lg:pl-[1.5rem]">
          <h1 className="font-bold text-[3.5rem] lg:text-[7rem]">phygital</h1>
          <p className="text-primary-green text-[1rem] lg:text-[1.5rem]">
            /fig-it-awl/ <i>phrasal verb</i>
          </p>
          <p className="text-[1rem] lg:text-[1.5rem]">
            a process using blockchain technology whereby ownership of a
            physical item becomes verifiable digitally
          </p>
        </div>
        <div className="w-full md:w-[50%] relative flex items-center justify-center">
          <Image
            src={`/assets/card.png`}
            alt="header"
            width={350}
            height={500}
            priority
            className="brightness-125"
          />
        </div>
      </div>
    </div>
  );
}
