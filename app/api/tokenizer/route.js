import { createClient } from "@supabase/supabase-js";
import Midtrans from "midtrans-client";


//import { NextResponse } from "next/server";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
let snap = new Midtrans.Snap({
  isProduction: process.env.NODE_ENV === "development" ? false : true,
  serverKey:
    process.env.NODE_ENV === "development"
      ? process.env.MIDTRANS_SERVER_SECRET
      : process.env.MIDTRANS_SERVER_SECRET_PROD,
  clientKey:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_CLIENT
      : process.env.NEXT_PUBLIC_CLIENT_PROD,
});


export async function POST(request) {
  const { id, donationName, price, quantity, username, email } =
    await request.json();


  let parameter = {
    item_details: {
      name: donationName,
      price: price,
      quantity: quantity,
    },
    transaction_details: {
      order_id: id,
      gross_amount: price * quantity,
    },
    customer_details: {
      first_name: username,
      email: email,
    },
  };


  const token = await snap.createTransactionToken(parameter);


  console.log(token);


  return Response.json({
    token,
  });
}



