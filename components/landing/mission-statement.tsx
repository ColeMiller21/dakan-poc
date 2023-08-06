"use client";
import React from "react";
import { motion } from "framer-motion";

export function MissionStatement() {
  return (
    <motion.div
      initial={{ scale: 1, opacity: 0, translateY: "20px" }}
      animate={{ scale: 1, opacity: 1, translateY: 0 }}
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 1,
        delay: 0.2,
      }}
      className="w-full mb-[100px] flex justify-center items-center"
    >
      <div className="w-full md:w-[55%] text-[2rem] text-center lg:text-left lg:text-[3rem]">
        <p className="leading-tight">
          <span className="font-extrabold">Trade, display,</span> and{" "}
          <span className="font-extrabold">explore</span> a unique world of{" "}
          <span className="text-dakanGreen font-extrabold">collectibles,</span>{" "}
          boasting the security and convience of cutting edge technology.
        </p>
      </div>
    </motion.div>
  );
}
