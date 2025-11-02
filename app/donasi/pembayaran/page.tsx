"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const DonasiPage = () => {
  return (
    <div className="grid grid-cols-2 bg-[#114CC8] min-h-screen px-20 justify-center gap-x-10 pt-20">
      <div className="flex flex-row">
        <Image
          src="/images/placeholder1.png"
          width={586}
          height={391}
          alt="placeholder"
          className="object-cover rounded-xl w-full h-fit"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-[64px] text-[#CBFF08] font-bold mb-1">
          Donasi Sekarang
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
        <Button
          className="bg-[#CBFF08] text-white border-0 rounded-lg font-bold hover:cursor-pointer"
          onClick={() => (window.location.href = "/pembayaran")}
        >
          Donasi
        </Button>
      </div>
    </div>
  );
};

export default DonasiPage;
