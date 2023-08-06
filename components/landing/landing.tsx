"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { DotBanner } from "./dot-banner";

export function Landing() {
  return (
    <div className="w-full min-h-screen lg:min-h-[600px] flex flex-col items-center lg:flex-row overflow-hidden">
      <motion.div
        initial={{ scale: 1, opacity: 0, translateY: "20px" }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 1,
          delay: 0.2,
        }}
        className="w-full h-[50vh] lg:min-h-[600px] lg:w-[50%] text-[6rem] flex flex-col items-center mb-[120px] overflow-visible gap-[1rem]"
      >
        <DotBanner />
        <h1 className="flex flex-col justify-center leading-none text-[2.25rem] md:text-[3.25rem] lg:text-[4.5rem] flex-grow">
          <span>
            The first <span className="font-bold">phygital</span>
          </span>
          <span>marketplace.</span>
        </h1>
        <DotBanner />
      </motion.div>
      <motion.div
        initial={{ scale: 1, opacity: 0, translateY: "20px" }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 1,
          delay: 0.2,
        }}
        className="w-full md:w-[70%] lg:w-[50%] relative mb-[120px] z-10 aspect-[580/589] mr-4 lg:mr-8"
      >
        <Image
          src={`/assets/header-image.png`}
          alt="header"
          fill
          priority
          className="z-10"
        />
      </motion.div>
    </div>
  );
}
