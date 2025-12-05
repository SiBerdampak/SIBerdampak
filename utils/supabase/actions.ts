"use server";
// import { supabase } from "../db";
import { createClient } from "./client";
// aa
//
export interface DonationData {
  id?: number;
  name: string;
  message: string;
  donation_amount: number;
  order_id?: string;
  email?: string;
  payment_status?: string;
}

export async function insertDonation({
  name,
  message,
  donation_amount,
  order_id,
  email,
  payment_status,
}: DonationData) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("donation")
    .insert([
      { name, message, donation_amount, order_id, email, payment_status },
    ])
    .select();

  if (data) {
    console.log("Donation inserted:", data);
  }

  if (error) {
    console.error("Error inserting donation:", error);
  }
}

export async function updateDonationStatus({
  order_id,
  payment_status,
}: DonationData) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("donation")
    .update({ payment_status })
    .eq("order_id", order_id)
    .select();

  if (data) {
    console.log("Donation updated:", data);
  }

  if (error) {
    console.error("Error updating donation:", error);
  }
}

export async function getTotalDonation(): Promise<number> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("donation")
    .select("donation_amount"); // this ALWAYS returns an array

  if (error) {
    console.error("Error fetching donation:", error);
    return 0;
  }

  if (!data || data.length === 0) return 0;

  // Parse and sum all donations
  const total = data.reduce((acc, row) => {
    const amount = Number(row.donation_amount) || 0;
    return acc + amount;
  }, 0);

  return total;
}
