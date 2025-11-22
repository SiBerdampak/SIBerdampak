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
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/" || pathname === "/donasi";

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isHome
          ? "translate-y-0 opacity-100"
          : isHovered
          ? "translate-y-0 opacity-100"
          : "-translate-y-10 opacity-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="flex flex-row bg-gradient-to-r from-[#061E4F] to-[#0E45B5] justify-between px-6 py-5 shadow-lg">
        {/* LOGO */}
        <div className="flex flex-row items-center">
          <Image
            src="/images/siberdampak_navbar_logo.png"
            width={124}
            height={26}
            alt="SIBerdampak Logo"
            className="hidden md:block h-auto w-auto"
          />

          <Image
            src="/images/logo_siberdampak_kecil.png"
            width={25}
            height={25}
            alt="SIBerdampak Logo"
            className="block md:hidden h-auto w-auto"
          />
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex flex-row text-white text-center items-center">
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

        {/* HAMBURGER BUTTON (MOBILE) */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="md:hidden bg-[#0E45B5] text-white flex flex-col px-6 py-4 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="py-2 border-b border-white/20"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
