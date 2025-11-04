"use client";
import React from "react";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const DonasiPage = () => {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 bg-[#114CC8] min-h-screen px-5 lg:px-20 justify-center gap-x-10 pt-20 overflow-hidden relative ">
      <Image
        src="/images/asteriks.png"
        width={965}
        height={950}
        alt="placeholder"
        className="object-cover w-[28rem] h-fit absolute -bottom-[8rem] -left-[8rem]"
      />
      <Image
        src="/images/asset1.png"
        width={5527}
        height={2070}
        alt="placeholder"
        className="object-cover scale-[2] w-full h-fit absolute -top-[10rem] left-[5rem]"
      />
      <div className="flex flex-row z-10">
        <Image
          src="/images/orang1.png"
          width={1172}
          height={782}
          alt="placeholder"
          className="object-cover w-full h-fit rounded-lg"
        />
      </div>
      <div className="flex flex-col z-10">
        <h2 className="text-[64px] text-[#CBFF08] font-bold mb-1">
          Detail Donasi
        </h2>
        <p className="text-justify text-sm text-white mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <span className="text-white font-bold text-sm">Target</span>
        <ProgressBar value={50} />
        <Button
          className="bg-[#CBFF08] text-white border-0 rounded-lg font-bold hover:cursor-pointer py-8 text-xl"
          onClick={() => (window.location.href = "/donasi/pembayaran")}
        >
          Donasi
        </Button>
      </div>
    </div>
  );
};

export default DonasiPage;
