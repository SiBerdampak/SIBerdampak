"use server";
// import { supabase } from "../db";
import { createClient } from "./client";

export interface DonationData {
  id?: number;
  name: string;
  message: string;
  donation_amount: number;
  order_id?: string;
  email?: string;
}

export async function insertDonation({
  name,
  message,
  donation_amount,
  order_id,
  email,
}: DonationData) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("donation")
    .insert([{ name, message, donation_amount, order_id, email }])
    .select();

  if (data) {
    console.log("Donation inserted:", data);
  }

  if (error) {
    console.error("Error inserting donation:", error);
  }
}
