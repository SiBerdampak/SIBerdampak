"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const minLoadingTime = 5000; // 5 detik minimal

    // Deteksi kapan halaman benar-benar siap
    const checkPageReady = () => {
      if (document.readyState === "complete") {
        setIsPageReady(true);
      }
    };

    // Check initial state
    checkPageReady();

    // Listen untuk perubahan readyState
    document.addEventListener("readystatechange", checkPageReady);
    window.addEventListener("load", () => setIsPageReady(true));

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        const elapsedTime = Date.now() - startTime;
        const timeBasedProgress = (elapsedTime / minLoadingTime) * 100;

        // Progress mengikuti yang lebih lambat antara waktu atau loading sebenarnya
        let newProgress = Math.min(timeBasedProgress, prev + 2);

        // Jika halaman sudah siap dan minimal waktu tercapai
        if (isPageReady && elapsedTime >= minLoadingTime) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }

        // Batasi progress di 95% sampai halaman benar-benar siap
        if (!isPageReady && newProgress > 95) {
          return 95;
        }

        return Math.min(newProgress, 100);
      });
    }, 40);

    return () => {
      clearInterval(interval);
      document.removeEventListener("readystatechange", checkPageReady);
      window.removeEventListener("load", checkPageReady);
    };
  }, [isPageReady]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#114CC8] text-white"
        >
          {/* Logo */}
          <motion.img
            src="/images/logosiberdampak.svg"
            alt="Logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-40 h-40 mb-6"
          />

          {/* Progress Bar Container */}
          <div className="w-52 h-3 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
            />
          </div>

          {/* Uncomment jika ingin tampilkan persentase */}
          {/* <span className="mt-3 text-sm text-gray-400">{Math.round(progress)}%</span> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}