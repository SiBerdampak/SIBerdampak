"use client";
import Typography from "@/components/Typography";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative text-white">
      {/* Section 1 */}
      <section className="relative overflow-hidden min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg-landing.svg"
            alt="Helping each other"
            fill
            className="object-cover"
            priority
          />
          {/* Blue overlay */}
          <div className="absolute inset-0 bg-[#061E4F]/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 sm:px-10 md:px-20">
          <div className="grid md:grid-cols-2 lg:gap-50 gap-10 items-center py-20">
            {/* Left Text Section */}
            <div className="space-y-4 max-w-2xl">
              <Typography variant="h6" weight="regular" className="text-lime-400 font-medium">Lend a Helping Hand</Typography>
              <Typography className="lg:text-7xl sm:text-5xl md:text-6xl font-bold leading-tight text-[#FDFFFF]">
                Only by Helping Each Other We Can Make World Better
              </Typography>
              <Typography variant="t" className="text-gray-200 text-sm sm:text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
                nec fringilla accumsan, risus sem.
              </Typography>
            </div>

            {/* Right Donation Card */}
            <div className="bg-white/90 text-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg backdrop-blur-md max-w-lg">
              <Typography variant="h6" className="font-extrabold text-3xl sm:text-xl mb-2">
                Help Children Get Out of Poverty and Have a Future
              </Typography>
              <Typography variant="t" className="text-sm text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
                nec fringilla accumsan, risus sem.
              </Typography>

              {/* Progress */}
              <div className="mb-2 flex justify-between text-sm font-medium">
                <Typography><span className="text-blue-700">Rp300.000</span></Typography>
                <Typography><span className="text-gray-500">Goals Rp500.000</span></Typography>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <p className="text-right text-xs text-gray-600 mb-4">60%</p>

              <button className="w-full py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition">
                Go Donation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Wave */}
      <div className="relative w-full overflow-hidden leading-none max-sm:-mt-[40px] max-md:-mt-[58px] max-lg:-mt-[80px] lg:-mt-[128px] z-[11]">
        <Image
          src="/images/landing-wave.svg"
          alt="Bottom wave"
          width={1200}
          height={100}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Section 2 */}
      <section className="bg-white text-gray-800 min-h-[50vh]">
        <div className="px-6 sm:px-10 md:px-20 py-20">
          <h2 className="text-3xl font-bold mb-4">Section Kedua</h2>
          <p className="text-base leading-relaxed">
            Ini adalah section baru dengan background putih. Kamu bisa tambahkan content apa saja di sini. Wave di atas menutupi batas antara background gelap (section 1) dan putih (section 2).
          </p>
        </div>
      </section>
    </main>
  );
}