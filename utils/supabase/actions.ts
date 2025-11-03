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
  payment_status?: string;
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
