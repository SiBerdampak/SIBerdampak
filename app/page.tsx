"use client";
import Typography from "@/components/Typography";
import { cn } from "@/lib/utils";
import { getTotalDonation } from "@/utils/supabase/actions";
import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Home() {
  useEffect(() => {
    AOS.init()
  }, [])
  const [totalDonation, setTotalDonation] = useState(0);
  const GOAL = 1000000;

  useEffect(() => {
    const fetchTotal = async () => {
      const total: number = await getTotalDonation();
      setTotalDonation(total);
    };

    fetchTotal();
  }, []);

  const percentage = Math.min(Math.round((totalDonation / GOAL) * 100), 100);

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
              <div className="space-y-4 md:space-y-6" data-aos="fade-right">
                <p className="text-sm md:text-base lg:text-lg font-medium text-transparent md:text-[#CBFF08] tracking-wide uppercase font-Geist">
                  Kebaikan Nyata Untuk Sesama
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight font-Geist">
                  Kebaikan yang Kamu Beri, Menghidupkan Harapan Mereka
                </h1>
              </div>

              {/* Right Donation Card */}
              <div className="bg-white/95 text-gray-800 rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl backdrop-blur-md">
                <div className="space-y-4 md:space-y-5">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#061E4F] leading-tight font-Geist">
                    Satu Klik Kecil, untuk Mereka yang Membutuhkan
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed text-justify font-Geist">
                    Setiap donasi bukan sekadar memberi, tapi juga bentuk
                    kepedulian yang menumbuhkan harapan. Melalui SIBerdampak,
                    kamu bisa menyalurkan bantuan dengan mudah, transparan, dan
                    tepat sasaran. Mari bersama membangun ekosistem berbagi yang
                    berkelanjutan karena kebaikan akan selalu kembali pada
                    mereka yang menebarkannya.
                  </p>

                  {/* Progress Section */}
                  <div className="pt-3">
                    <div className="flex justify-between text-sm md:text-base lg:text-lg font-medium mb-2">
                      <span className="text-gray-900 font-bold font-Geist">
                        Rp {totalDonation.toLocaleString("id-ID")}
                      </span>
                      <span className="text-[#114CC8] font-bold font-Geist">
                        Goals Rp {GOAL.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 md:h-3.5 overflow-hidden font-Geist">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm md:text-base text-gray-600 mt-2 font-Geist">
                      {percentage}%
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button
                  className="hover:cursor-pointer mt-6 md:mt-7 lg:mt-8 w-full py-3 md:py-4 text-base md:text-lg font-semibold bg-[#114CC8] text-white rounded-lg hover:bg-blue-800 active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => (window.location.href = "/donasi")}
                >
                  Go Donate
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

      {/* Section About Us */}
      <section className="bg-white text-gray-800 min-h-[50vh] md:-translate-y-[10rem] lg:-translate-y-[15rem]">
        <div className="px-6 sm:px-10 md:px-20 flex flex-col">
          <Image
            src="/images/about-us-picture.png"
            alt="About Us Picture"
            width={1917}
            height={1216}
            className="w-[100%] md:w-1/2 lg:w-[70%] h-fit object-cover mx-auto"
            priority
          />
          <span className="text-3xl font-bold mb-4 text-[#114CC8] text-center font-Geist">
            About Us
          </span>
          <p className="text-lg leading-relaxed font-regular text-black text-center px-5 md:px-20 lg:px-32 font-Geist">
            Kami adalah platform sosial dari mahasiswa Sistem Informasi Institut
            Teknologi Sepuluh Nopember yang ingin berdampak bagi masyarakat
            dengan menyalurkan bantuan berupa makanan, minuman, dan catatan
            inspiratif kepada mereka yang membutuhkan
          </p>
        </div>
      </section>

      {/* Section Visi Misi */}
      <section
        className="w-full relative min-h-screen flex flex-col justify-center items-center overflow-hidden
                   translate-y-[5rem] sm:translate-y-[1rem] md:-translate-y-[10rem] lg:-translate-y-[10rem] px-4 gap-20"
      >
        {/* Vision */}
        <div className="relative w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl aspect-[5/3] md:aspect-[7/3] lg:aspect-[7/2] z-[2]">
          {/* BACK FRAME */}
          <div className="absolute inset-0 bg-[#CBFF08] rounded-[10px] rotate-3 z-[2] shadow-lg" />

          {/* FRONT FRAME */}
          <div className="absolute inset-0 bg-[#114CC8] rounded-[10px] shadow-xl flex justify-center items-center z-[3]">
            <div className="w-full px-4 text-center flex flex-col md:gap-8 lg:gap-12 gap-4">
              <div className="pt-2">
                <Typography
                  weight="extrabold"
                  className="max-sm:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#CBFF08]"
                >
                  Our Visions
                </Typography>
              </div>

              <div className="px-2 md:px-10">
                <Typography className="max-sm:text-[12px] text-sm md:text-sm lg:text-xl leading-5 lg:leading-8 text-[#FDFFFF]">
                  Menjadi jembatan kebaikan yang tulus, menghubungkan hati yang
                  ingin berbagi dengan mereka yang membutuhkan, melalui sentuhan
                  teknologi yang sederhana dan bermakna. Dengan demikian,
                  SIBerdampak mendukung peningkatan dalam SDGs poin ke-2 dan 3
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="relative w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl z-[2]">
          {/* Back Frame */}
          <div className="absolute inset-0 bg-[#CBFF08] rounded-3xl -rotate-3 shadow-2xl" />

          {/* Front Frame */}
          <div className="relative bg-[#114CC8] rounded-3xl shadow-2xl p-8 sm:p-10 md:p-14 lg:p-20">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#CBFF08] font-Geist">
                Our Mission
              </h2>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="rounded-xl bg-[#CBFF08] flex flex-col md:flex-row items-center gap-4 p-5 shadow-lg"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-[10px] bg-[#114CC8] flex items-center justify-center text-white font-bold text-3xl">
                    {num}
                  </div>
                  <p className="text-black font-medium text-base md:text-lg leading-relaxed text-center md:text-left font-Geist">
                    {num === 1 &&
                      "Menciptakan ruang berbagi yang nyaman dan ikhlas, di mana setiap niat baik dapat tersalurkan semudah mengulurkan tangan"}
                    {num === 2 &&
                      "Merangkul komunitas dan pegiat usaha lokal untuk tumbuh bersama, merajut jaringan kebaikan yang lebih kuat hingga ke pelosok."}
                    {num === 3 &&
                      "Menjaga setiap amanah dengan penuh tanggung jawab, memastikan setiap uluran tangan sampai tujuannya dengan hati yang tenang."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <div className="max-w-[50rem] text-center mx-auto z-[20] relative mt-[10rem]">
          <div className="flex flex-col items-center justify-center mx-10  py-12 bg-[#114CC8] mb-20 rounded-xl shadow-lg z-[20]">
            <h2 className="text-5xl font-bold mb-4 text-[#CBFF08]">
              Our Visions
            </h2>
            <p className="w-3/4 text-base leading-relaxed font-normal text-white mt-3 text-justify">
              Menjadi jembatan kebaikan yang menghubungkan mereka yang ingin
              berbagi dengan yang membutuhkan.
            </p>
          </div> */}

        {/* <div className="flex flex-col items-center mx-10 justify-center px-8 py-8 bg-[#114CC8] rounded-xl shadow-lg z-[20] mb-6 lg:mb-10">
            <h2 className="text-5xl font-bold mb-6 text-[#CBFF08]">
              Our Missions
            </h2>

            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="rounded-lg bg-[#CBFF08] flex flex-col md:flex-row p-3 max-w-[35rem] w-full mx-auto items-center mb-5"
              >
                <div className="md:w-auto w-full  mb-2 md:mb-0 text-white rounded-lg bg-[#114CC8] py-2 px-5 font-bold text-4xl">
                  {num}
                </div>
                <p className="text-base font-normal text-black px-3 text-justify">
                  {num === 1 &&
                    "Menyediakan ruang berbagi yang mudah dan ikhlas."}
                  {num === 2 &&
                    "Menjamin transparansi dalam setiap proses donasi."}
                  {num === 3 &&
                    "Menjaga amanah dengan memastikan bantuan sampai tepat sasaran."}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        <Image
          src="/images/asset1.png"
          alt="Asset1"
          width={5527}
          height={2070}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto max-w-full max-h-full object-contain z-[1] scale-[1.5]"
        />
      </section>
    </main>
  );
}
