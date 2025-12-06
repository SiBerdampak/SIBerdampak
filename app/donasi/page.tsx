"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { detailDonasi, DetailDonasiSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { getTotalDonation, insertDonation } from "@/utils/supabase/actions";
import Image from "next/image";
import Typography from "@/components/Typography";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";


const DonasiPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<null | number>(null);
  const [isAnon, setIsAnon] = useState(false);


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


  useEffect(() => {
    // render midtrans snap token
    const snapScript =
      process.env.NODE_ENV === "development"
        ? "https://app.sandbox.midtrans.com/snap/snap.js"
        : "https://app.midtrans.com/snap/snap.js";


    const clientKey = process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_CLIENT!
        : process.env.NEXT_PUBLIC_CLIENT_PROD!;


    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;


    document.body.appendChild(script);


    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const generateOrderId = () => {
    // Get current timestamp (YYYYMMDDHHmmss format)
    const now = new Date();
    const timestamp =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");


    // Generate random 6-character string
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();


    return `${timestamp}-${randomStr}`;
  };


  const handlePayment = async ({
    price,
    donationName,
    username,
    email,
    message,
  }: {
    price: number;
    donationName: string;
    username: string;
    email: string;
    message: string;
  }) => {
    // Initiate payment


    if (price === 0) {
      alert("Jumlah donasi harus lebih dari 0");
      return;
    }


    const order_id = generateOrderId();


    const response = await fetch("/api/tokenizer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: order_id,
        donationName: donationName,
        price: price,
        quantity: 1,
        username: username,
        email: email,
        message: message || '',
      }),
    });


    if (!response.ok) throw new Error("Payment initiation failed");


    const { token } = await response.json();


    // Close dialog and open payment gateway
    if (typeof window.snap?.pay === "function") {
      setIsDialogOpen(false);


      (window.snap as any).pay(token, {
        // 1. SUCCESS: Hanya redirect jika BENAR-BENAR SUKSES
        onSuccess: async function(result: any) {
          console.log("Payment Success", result);
          try {
            await insertDonation({
              name: username,          
              email: email,            
              message: message,        
              donation_amount: price,  
              order_id: order_id,      
              payment_status: "success"
            });
           
            console.log("Data berhasil disimpan via Frontend");
          } catch (error) {
            console.error("Gagal insert via Frontend:", error);
          }


          window.location.href = "/donasi/terimakasih";
        },


        onPending: function(result: any) {
          console.log("Payment Pending", result);
          alert("Menunggu pembayaran! Silakan selesaikan pembayaran Anda via Virtual Account/Merchant yang dipilih.");
        },


        onError: function(result: any) {
          console.error("Payment Error", result);
          alert("Pembayaran gagal. Silakan coba lagi.");
        },


        onClose: function() {
          console.log("Customer closed the popup without finishing the payment");
          alert("Anda belum menyelesaikan pembayaran. Silakan klik tombol Donasi lagi jika ingin melanjutkan.");
        }
      });


    } else {
      throw new Error("Payment gateway not available");
    }
  };


  const form = useForm({
    resolver: zodResolver(detailDonasi),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      donation_amount: 0,
    },
  });


  const onSubmit = async (data: DetailDonasiSchema) => {
    //LOGIN LOGIC HERE
    setLoading(true);


    try {
      await handlePayment({
        price: Number(data.donation_amount) || 0,
        donationName: "Donasi",
        username: data.name || "Anonim",
        email: data.email,
        message: data.message || "",
      });
    } catch (error) {
      console.log(error);
    }


    setLoading(false);
    // console.log(data);
  };


  return (
    <div className="relative min-h-screen bg-[linear-gradient(270deg,#8BB0FF_0%,#114CC8_50%,#082562_100%)] overflow-hidden">
      <Image
        src="/images/donasi2.svg"
        alt="Side Decoration"
        width={2804}
        height={986}
        className="absolute bottom-0 left-0"
      />
      <Image
        src="/images/donasi3.svg"
        alt="Side Decoration"
        width={1592}
        height={557}
        className="absolute top-0 left-0"
      />
      <Image
        src="/images/donasi1.svg"
        alt="Side Decoration"
        width={331}
        height={331}
        className="absolute top-0 right-0 lg:flex hidden"
      />
      <div className="grid grid-cols-1 xl:grid-cols-2 grid-rows-3 xl:grid-rows-1 xl:gap-[150px] xl:flex-row min-h-screen justify-center items-center xl:px-[130px] xl:pt-[150px] xl:pb-[80px]">
        {/* Logo + Text */}
        <div className="flex flex-col items-center justify-center w-full mt-4 max-sm:mt-20 xl:order-1 xl:pl-10">
          <Image
            src="/images/logosiberdampak.svg"
            width={368}
            height={228}
            alt="Logo SI Berdampak"
            className="lg:flex hidden"
          />
          <Image
            src="/images/logosiberdampak.svg"
            width={180}
            height={110}
            alt="Logo SI Berdampak"
            className="lg:hidden flex"
          />
          <div className="text-white text-center">
            <div>
              <Typography
                as="span"
                variant="h4"
                className="text-2xl max-sm:text-xl text-[#CBFF08] italic"
              >
                #Kebaikan Nyata Untuk Sesama
              </Typography>
            </div>
          </div>
        </div>


        <div className="bg-white flex flex-col justify-center row-span-3 xl:row-span-1 rounded-t-2xl xl:rounded-2xl shadow-xl p-[50px] xl:p-[72px] w-full h-full xl:h-fit z-10 xl:order-2">
          {/* Judul */}
          <Typography className="lg:text-5xl max-sm:text-xl text-3xl font-black">
            Ayo Berdonasi
          </Typography>


          {/* Donasi terkumpul */}
          <div className="mt-6">
            <div>
              <Typography className="text-[#151624] text-sm font-medium">
                Donasi terkumpul
              </Typography>
            </div>


            <div className="flex items-end justify-between">
              <div>
                <Typography className="text-[#114CC8] font-extrabold text-2xl">
                  Rp<span>{totalDonation.toLocaleString("id-ID")}</span>
                </Typography>
              </div>
              <div>
                <Typography className="text-[#151624] text-sm font-medium">
                  dari{" "}
                  <span className="font-bold">
                    Rp {GOAL.toLocaleString("id-ID")}
                  </span>
                </Typography>
              </div>
            </div>


            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="h-2 bg-[#114CC8] rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>


          {/* Tombol */}
          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* <button className="flex items-center justify-center gap-2 bg-[#114CC8] text-white font-medium py-2 px-4 rounded-[6px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 8a6 6 0 11-12 0 6 6 0 0112 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"
                />
              </svg>
              Para Orang Baik
            </button> */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center justify-center gap-2 bg-[#114CC8] hover:bg-[#0e3da2] text-white font-medium py-2 px-4 rounded-[6px] hover:cursor-pointer">
                  Penggunaan Dana
                </Button>
              </DialogTrigger>
              <DialogContent className="max-sm:max-w-[425px] max-w-[612px] rounded-[14px]">
                <DialogHeader>
                  <DialogTitle className="text-[32px] max-sm:text-2xl font-bold text-[#114CC8] font-Geist">
                    Rincian Penggunaan Dana
                  </DialogTitle>
                </DialogHeader>


                <div className="grid gap-4">
                  {/* Total Amount */}
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between pb-2 border-b-2 border-gray-200">
                      <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-full">
                          {percentage}%
                        </span>
                        <span className="text-base font-bold text-gray-900">
                          Dana Terkumpul
                        </span>
                      </div>
                      <span className="text-base font-bold text-gray-900">
                        Rp{totalDonation.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>


                  {/* Breakdown Sections */}
                  <div className="grid gap-3">
                    {/* 95% Section */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                          95%
                        </span>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start">
                            <Typography className="font-semibold text-gray-900 text-sm">
                              Dana untuk penggalang dana
                            </Typography>
                            <Typography className="font-semibold text-gray-900 text-sm">
                              Rp {(totalDonation * 0.9).toLocaleString("id-ID")}
                            </Typography>
                          </div>
                          <div className="flex justify-between items-start">
                            <Typography className="text-xs md:text-sm text-gray-700">
                              Biaya transaksi dan teknologi*
                            </Typography>
                            <Typography className="text-sm text-gray-700">
                              Rp{" "}
                              {(totalDonation * 0.05).toLocaleString("id-ID")}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* 5% Section */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                          5%
                        </span>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <Typography className="font-semibold text-gray-900 text-sm">
                              Dana untuk operasional
                            </Typography>
                            <Typography className="font-semibold text-gray-900 text-sm">
                              Rp{" "}
                              {(totalDonation * 0.05).toLocaleString("id-ID")}
                            </Typography>
                          </div>
                          <Typography className="text-xs md:text-sm text-gray-700 leading-tight text-justify">
                            Donasi untuk operasional SIBerdampak agar donasi
                            semakin aman, mudah dan transparan. Maksimal 5% dari
                            donasi terkumpul
                          </Typography>
                        </div>
                      </div>
                    </div>


                    {/* Note */}
                    <div className="bg-yellow-50 rounded-lg p-3 mt-1">
                      <Typography className="text-xs md:text-sm text-gray-700 leading-tight text-justify">
                        * Biaya ini 100% dibayarkan kepada pihak ketiga penyedia
                        layanan transaksi digital dan Virtual Account, dompet
                        digital dan QRIS serta layanan notifikasi (SMS, WA &
                        email) dan server. SIBerdampak tidak mengambil
                        keuntungan dari layanan ini
                      </Typography>
                    </div>


                    <div className="rounded-lg p-3 mt-1">
                      <Typography className="text-xs md:text-sm text-gray-700 leading-tight text-justify">
                        <span className="font-bold">Contact Person: </span>{" "}
                        Akhtar Ibrahim (+62 811-4000-660)
                      </Typography>
                    </div>
                  </div>
                </div>


                <DialogFooter className="flex-col sm:flex-col gap-3">
                  <Button
                    type="button"
                    className="bg-[#114CC8] hover:cursor-pointer"
                    onClick={() =>
                      window.open(
                        "https://docs.google.com/spreadsheets/d/12YqhsaQiluKsbbYcIC9J3PrEezJ4VzxRy8G-a50clrc/edit?gid=393422695#gid=393422695",
                        "_blank"
                      )
                    }
                  >
                    Dokumentasi Donasi
                  </Button>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="border-[#114CC8] hover:cursor-pointer"
                    >
                      Kembali
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>


          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Email */}
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="lg:text-[14px] text-[12px] inline">
                          Nama<span className="text-red-500">*</span>
                        </FormLabel>


                        {/* TOGGLE ANONIM */}
                        <div className="flex items-center gap-2">
                          <Label htmlFor="anon" className="text-xs lg:text-sm">
                            Anonim
                          </Label>
                          <Switch
                            id="anon"
                            checked={isAnon}
                            onCheckedChange={(checked: boolean) => {
                              setIsAnon(checked);


                              if (checked) {
                                form.setValue("name", "Anonim");
                              } else {
                                form.setValue("name", "");
                              }
                            }}
                          />
                        </div>
                      </div>


                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Masukkan nama anda"
                          {...field}
                          disabled={isAnon}
                          className="lg:text-[14px] text-[12px] text-[#A6ACB3] py-[6px] px-[12px] rounded-[6px]"
                        />
                      </FormControl>


                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="lg:text-[14px] text-[12px] inline">
                        Email<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Masukkan alamat email anda"
                          {...field}
                          className="lg:text-[14px] text-[12px] text-[#A6ACB3] py-[6px] px-[12px] rounded-[6px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              {/* Password with show/hide toggle */}
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] lg:text-[14px]">
                        Catatan untuk mereka
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Masukkan doa anda"
                            maxLength={50}
                            {...field}
                            className="lg:text-[14px] text-[12px] text-[#A6ACB3] py-[6px] px-[12px] rounded-[6px]"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              {/* Pilihan Jenis Donasi */}
              <div className="mt-4 flex flex-col">
                <FormLabel className="text-[12px] lg:text-[16px] font-bold flex items-center gap-2">
                  Pilih Jenis Donasi
                  {/* INFO BUTTON (i) */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-300 text-[10px] font-bold text-white"
                        >
                          i
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[200px] text-xs">
                        Untuk pilihan paket 15000 kami akan memberikan 3 makanan
                        kepada orang yang membutuhkan.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>


                <div className="grid grid-cols-1 gap-3 mt-2">
                  {[15000].map((amount, idx) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setSelectedPackage(amount);
                        form.setValue("donation_amount", amount);
                      }}
                      className={`py-2 rounded-md border font-semibold text-sm transition hover:cursor-pointer
          ${
            selectedPackage === amount
              ? "bg-[#114CC8] text-white"
              : "bg-white border-gray-300 text-[#114CC8]"
          }`}
                    >
                      Paket
                      <br />
                      Rp{amount.toLocaleString("id-ID")}
                    </button>
                  ))}
                </div>
                <span className="text-center text-xs mx-auto my-2 text-gray-400 font-semibold">
                  Atau
                </span>
                {/* Custom donation option */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPackage(null);
                    form.setValue("donation_amount", 0);
                  }}
                  className={` py-2 w-full rounded-md border text-sm font-semibold transition hover:cursor-pointer
      ${
        selectedPackage === null
          ? "bg-[#114CC8] text-white"
          : "bg-white border-gray-300 text-[#114CC8]"
      }`}
                >
                  Donasi Sukarela
                </button>
              </div>


              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="donation_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] lg:text-[16px]">
                        Jumlah Donasi
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="Masukkan jumlah donasi"
                            {...field}
                            disabled={selectedPackage !== null}
                            value={
                              typeof field.value === "number" && field.value > 0
                                ? field.value
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? undefined
                                  : Number(e.target.value)
                              )
                            }
                            className={cn(
                              "lg:text-[14px] text-[12px] text-[#A6ACB3] py-[6px] px-[12px] rounded-[6px]",
                              selectedPackage !== null &&
                                "bg-gray-100 cursor-not-allowed"
                            )}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              {/* Submit Button */}
              <div className="mt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full hover:cursor-pointer rounded-[6px] bg-[#114CC8] hover:bg-[#1040a7] text-white transition px-4 py-2",
                    loading && "opacity-60"
                  )}
                >
                  {loading ? "Loading..." : "Donasi"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};


export default DonasiPage;


