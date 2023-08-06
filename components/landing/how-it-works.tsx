"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export function HowItWorks() {
  return (
    <div className="w-full flex flex-col items-center gap-[50px] mb-[100px]">
      <h2 className="text-[3rem] lg:text-[4rem] ">
        <span className="font-bold">How</span> it works
      </h2>
      <div className="hidden w-full lg:w-[70%] lg:flex flex-col gap-[2rem] max-w-7xl">
        <WorksCard
          number={1}
          image="/assets/close-up-hands-holding-box.jpeg"
          imageAlt="close-up-hands-holding-box"
          text="Carefully protect your item(s) and send them to the DAKAN vault."
          title="Prepare your assets"
        />
        <WorksCard
          number={2}
          image="/assets/courier-unloading-cardboard-boxes.jpeg"
          imageAlt="alt"
          text="Create a prepaid label from your Dakan Vault account for assets valued under $10k."
          title="Ship your package"
        />
        <WorksCard
          number={3}
          image="/assets/locker-train-station.jpeg"
          imageAlt="alt"
          text="Within 3 business days of receipt, your items will be added to your portfolio."
          title="Assets catalogued & vaulted"
        />
      </div>
      <div className="flex w-full md:w-[75%] lg:hidden flex-col gap-[2rem]">
        <MobileWorksCard
          number={1}
          image="/assets/close-up-hands-holding-box.jpeg"
          imageAlt="alt"
          text="Carefully protect your item(s) and send them to the DAKAN vault."
          title="Prepare your assets"
        />
        <MobileWorksCard
          number={2}
          image="/assets/courier-unloading-cardboard-boxes.jpeg"
          imageAlt="alt"
          text="Create a prepaid label from your Dakan Vault account for assets valued under $10k."
          title="Ship your package"
        />
        <MobileWorksCard
          number={3}
          image="/assets/locker-train-station.jpeg"
          imageAlt="alt"
          text="Within 3 business days of receipt, your items will be added to your portfolio."
          title="Assets catalogued & vaulted"
        />
      </div>
      <div className="w-full flex flex-col items-center md:flex-row gap-[2.5rem] md:justify-around px-4 lg:px-8">
        <div className="relative w-full aspect-[16/8]">
          <Image
            src={`/assets/secure-in-vault.png`}
            alt="Lock in value"
            fill
            className="shadow-md rounded-md"
          />
        </div>
        <div className="relative w-full aspect-[16/8]">
          <Image
            src={`/assets/real-time.png`}
            alt="Real Time Value"
            fill
            className="shadow-md rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

interface WorksCardProps {
  image: string;
  title: string;
  text: string;
  number: number | string;
  imageAlt: string;
}

const WorksCard = ({
  image,
  title,
  text,
  number,
  imageAlt,
}: WorksCardProps) => {
  return (
    <div className="w-full bg-[#e9e9ec] rounded-lg flex flex-col lg:flex-row lg:gap-[2.5rem] overflow-hidden lg:h-[250px] shadow-md">
      <div className="w-[10%] py-[2rem] pl-[2rem]">
        <div className="w-[50px] aspect-square text-white bg-[#66ff91] flex justify-center items-center text-[30px] font-bold">
          {number}
        </div>
      </div>
      <div className="w-[60%] py-[2rem] flex flex-col gap-[1rem]">
        <span className="lg:text-[1.75rem] xl:text-[2rem] font-bold text-black">
          {title}
        </span>
        <span className="lg:text-[1.25rem] xl:text-[1.5rem] text-black">
          {text}
        </span>
      </div>
      <div className="lg:w-[45%] xl:w-[40%] overflow-hidden  relative">
        <Image src={image} alt={imageAlt} fill className="object-cover" />
      </div>
    </div>
  );
};

const MobileWorksCard = ({
  image,
  title,
  text,
  number,
  imageAlt,
}: WorksCardProps) => {
  return (
    <div className="w-full bg-[#e9e9ec] rounded-lg flex flex-col overflow-hidden shadow-sm gap-[1.5rem]">
      <div className="flex  px-[1.5rem] mt-[1.5rem]">
        <div className="w-[50px] aspect-square text-white bg-[#66ff91] flex justify-center items-center text-[30px] font-bold">
          {number}
        </div>
      </div>
      <span className="text-[2rem] font-bold px-[1.5rem] leading-none text-black">
        {title}
      </span>
      <div className="w-full  flex flex-col gap-[2rem] px-[1.5rem] text-black">
        <span className="text-[1.25rem]">{text}</span>
      </div>
      <div className="w-full aspect-[16/10] relative">
        <Image src={image} alt={imageAlt} fill className="object-fill" />
      </div>
    </div>
  );
};
