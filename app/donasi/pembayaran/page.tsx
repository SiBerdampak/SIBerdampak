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
import { insertDonation } from "@/utils/supabase/actions";
import Image from "next/image";
import React from "react";

const DonasiPage = () => {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // render midtrans snap token
    const snapScript =
      process.env.NODE_ENV === "development"
        ? "https://app.sandbox.midtrans.com/snap/snap.js"
        : "https://app.midtrans.com/snap/snap.js";

    const clientKey = process.env.NEXT_PUBLIC_CLIENT!;

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
      }),
    });

    if (!response.ok) throw new Error("Payment initiation failed");

    const { token } = await response.json();

    // Close dialog and open payment gateway
    if (typeof window.snap?.pay === "function") {
      setIsDialogOpen(false); // Close dialog here
      window.snap.pay(token);

      insertDonation({
        name: username || "",
        message: message || "",
        donation_amount: price || 0,
        order_id: order_id,
        email: email || "",
        payment_status: "failed",
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
    <div className="flex flex-col lg:grid lg:grid-cols-2 bg-[#114CC8] min-h-screen gap-x-10 overflow-hidden relative">
      <div className="flex flex-row hidden lg:block">
        <Image
          src="/images/asteriks.png"
          width={965}
          height={950}
          alt="placeholder"
          className="object-cover w-md h-fit absolute -bottom-32 -left-32"
        />
        <Image
          src="/images/asset1.png"
          width={5527}
          height={2070}
          alt="placeholder"
          className="object-cover scale-[2] w-full h-fit absolute -top-40 left-20"
        />
      </div>
      <div className="flex flex-col bg-white p-20 z-50 min-h-screen">
        <h2 className="text-[64px] text-[#CBFF08] font-bold text-center lg:text-left mb-5">
          Donasi Sekarang
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 border-black"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px] lg:text-[16px]">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                      className="text-[12px] lg:text-[16px] p-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px] lg:text-[16px]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className="text-[12px] lg:text-[16px] p-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password with show/hide toggle */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[12px] lg:text-[16px]">
                    Message
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Enter your message"
                        {...field}
                        className="text-[12px] lg:text-[16px] pr-10 p-6"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        placeholder="Enter your donation amount"
                        {...field}
                        value={field.value as number | undefined}
                        onChange={(e) => field.onChange(Number(e.target.value))} // ubah ke number
                        className="text-[12px] lg:text-[16px] pr-10 p-6"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full hover:cursor-pointer rounded-full bg-[#CBFF08] hover:bg-[#93BA00] text-black transition px-9 py-6",
                loading && "opacity-60"
              )}
            >
              {loading ? "Loading..." : "Lakukan Pembayaran"}
            </Button>
            <span className="text-black text-sm flex flex-row justify-self-center">
              <p className="text-red-700">*</p>Pembayaran hanya dapat dilakukan
              via Qris
            </span>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DonasiPage;
