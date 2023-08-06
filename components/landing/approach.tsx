import React from "react";
import Image from "next/image";

export function Approach() {
  return (
    <div className="w-full min-h-auto flex flex-col items-center lg:items-start lg:flex-row gap-[2rem] lg:gap-0 mb-[100px]">
      <div className="w-full md:w-[50%] mx-auto relative lg:px-[3rem] flex justify-center items-center">
        <Image
          src={`/assets/images-grid.png`}
          alt="header"
          height={500}
          width={500}
          priority
        />
      </div>
      <div className="w-full md:w-[50%] flex flex-col gap-[2rem] text-[1.5rem] lg:px-[3rem] leading-relaxed text-center lg:text-left">
        <p className="w-full lg:w-[90%]">
          At Dakan, we've harnessed the power of NFTs and blockchain to create a
          semi-decentralized marketplace that transcends the limitations of
          traditional collecting.
        </p>
        <p className="w-full lg:w-[90%]">
          {" "}
          With our unique approach, you can securely store your physical
          treasures in our{" "}
          <span className="font-bold">state-of-the-art vaults, </span>while a
          digital counterpart becomes your key to unlocking the Dakan ecosystem.
        </p>
      </div>
    </div>
  );
}
