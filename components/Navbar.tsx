"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Our Team", path: "/our-team" },
  { name: "Donation", path: "/donasi" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const isHome = pathname === "/" || pathname === "/donasi/pembayaran";

  return (
    <div
      className={`fixed top-0 left-0 w-full z-99 transition-all duration-300 ${
        isHome
          ? "translate-y-0 opacity-100"
          : isHovered
          ? "translate-y-0 opacity-100"
          : "-translate-y-10 opacity-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="flex flex-row bg-gradient-to-r from-[#061E4F] to-[#0E45B5] justify-between px-10 py-5 shadow-lg">
        <div className="flex flex-row">
          <Image
            src="/images/siberdampak_navbar_logo.png"
            width={248}
            height={52}
            alt="SIBerdampak Logo"
            className="w-fit h-full"
          />
        </div>
        <div className="flex flex-row text-white text-center items-center">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="px-5 hover:underline transition-all duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
