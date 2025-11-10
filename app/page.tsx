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
      <div className="relative z-10 flex items-center min-h-screen px-4 md:px-8 lg:px-12 xl:px-20 py-12 md:py-16">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
              
              {/* Left Text Section */}
              <div className="space-y-4 md:space-y-6">
                <p className="text-sm md:text-base lg:text-lg font-medium text-[#CBFF08] tracking-wide uppercase">
                  Kebaikan Nyata Untuk Sesama
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Only by Helping Each Other We Can Make World Better
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem.
                </p>
              </div>

              {/* Right Donation Card */}
              <div className="bg-white/95 text-gray-800 rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl backdrop-blur-md">
                <div className="space-y-4 md:space-y-5">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">
                    Help Children Get Out of Poverty and Have a Future
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem.
                  </p>
                  
                  {/* Progress Section */}
                  <div className="pt-3">
                    <div className="flex justify-between text-sm md:text-base lg:text-lg font-medium mb-2">
                      <span className="text-gray-900 font-bold">Rp 300.000</span>
                      <span className="text-[#114CC8] font-bold">Goals Rp 500.000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 md:h-3.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-700 ease-out"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                    <p className="text-right text-sm md:text-base text-gray-600 mt-2">
                      60%
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button className="mt-6 md:mt-7 lg:mt-8 w-full py-3 md:py-4 text-base md:text-lg font-semibold bg-[#114CC8] text-white rounded-lg hover:bg-blue-800 active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl">
                  Go Donation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Wave */}
      <div className="relative w-full overflow-hidden leading-none max-sm:-mt-[45px] max-md:-mt-[58px] max-lg:-mt-[82px] max-xl:-mt-[115px] max-2xl:-mt-[130px] 2xl:-mt-[160px] z-[11]">
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
          <Typography className="text-3xl font-bold mb-4">Section Kedua</Typography>
          <Typography className="text-base leading-relaxed">
            Ini adalah section baru dengan background putih. Kamu bisa tambahkan content apa saja di sini. Wave di atas menutupi batas antara background gelap (section 1) dan putih (section 2).
          </Typography>
        </div>
      </section>
    </main>
  );
}