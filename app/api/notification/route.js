import { createServiceClient } from "@/utils/supabase/client";
import midtransClient from "midtrans-client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Prevent static behavior

const supabase = createServiceClient();
// Initialize Midtrans client
const snap = new midtransClient.Snap({
  isProduction: process.env.NODE_ENV === "development" ? false : true,
  serverKey: process.env.MIDTRANS_SERVER_SECRET,
});

async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

export async function POST(request) {
  try {
    // Get raw body for signature verification
    const rawBody = await getRawBody(request.body);

    // Verify notification through Midtrans API
    const notification = await snap.transaction.notification(rawBody);

    // Extract transaction details
    const { order_id, transaction_status, fraud_status } = notification;

    console.log(`Processing payment for Order ID: ${order_id}`);
    console.log(`Status: ${transaction_status}, Fraud Status: ${fraud_status}`);

    // Handle transaction status
    switch (transaction_status) {
      case "capture":
        if (fraud_status === "accept") {
          await handleSuccessPayment(order_id);
        } else {
          await handleFraudulentPayment(order_id);
        }
        break;
      case "settlement":
        await handleSuccessPayment(order_id);
        break;
      case "pending":
        await handlePendingPayment(order_id);
        break;
      case "deny":
      case "cancel":
      case "expire":
        await handleFailedPayment(order_id);
        break;
      default:
        console.warn(`Unhandled status: ${transaction_status}`);
        await handleUnknownStatus(order_id, transaction_status);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing payment notification:", error);
    return NextResponse.json(
      { error: "Notification processing failed", details: error.message },
      { status: 200 } // Maintain 200 to prevent Midtrans retries
    );
  }
}

// Handler functions remain the same
async function handleSuccessPayment(orderId) {
  try {
    console.log(`Payment successful for order: ${orderId}`);

    // insertDonation({
    //   name: username || "",
    //   message: message || "",
    //   donation_amount: price || 0,
    //   order_id: order_id,
    //   email: email || "",
    // });

    // Retrieve existing order
    // const { data: donation, error: donationError } = await supabase
    //   .from("donation")
    //   .select("payment_status")
    //   .eq("order_id", orderId)
    //   .single();

    const { data, error } = await supabase
      .from("donation")
      .update({ payment_status: "success" })
      .eq("order_id", orderId)
      .select();

    if (data) {
      console.log("Donation updated:", data);
    }

    if (error) {
      console.error("Error updating donation:", error);
    }

    // if (orderError || !order) {
    //   console.error("Order not found:", orderError?.message);
    //   return;
    // }

    // Update payment status (corrected update syntax)
    // const { error: paymentUpdateError } = await supabase
    //   .from("order")
    //   .update({ payment_status: "success" }) // Fixed object syntax
    //   .eq("order_id", orderId);

    // if (paymentUpdateError) {
    //   console.error(
    //     "Payment status update failed:",
    //     paymentUpdateError.message
    //   );
    //   return;
    // }

    // Validate package name
    // const packageName = order.package_name;
    // if (!Object.values(PACKAGE_NAME).includes(packageName)) {
    //   console.error("Invalid package name:", packageName);
    //   return;
    // }

    // // Get token value
    // const tokenValue = PACKAGE_DETAILS[packageName]?.token_value;
    // if (!tokenValue) {
    //   console.error("Token value not found for package:", packageName);
    //   return;
    // }

    // // Get user data
    // const { data: user, error: userError } = await supabase
    //   .from("profiles")
    //   .select("token_amount")
    //   .eq("id", order.user_id)
    //   .single();

    // if (userError || !user) {
    //   console.error("User not found:", userError?.message);
    //   return;
    // }

    // // Update token amount (corrected update syntax)
    // const newTokenBalance = user.token_amount + tokenValue;
    // const { error: tokenUpdateError } = await supabase
    //   .from("profiles")
    //   .update({ token_amount: newTokenBalance }) // Fixed object syntax
    //   .eq("id", order.user_id);

    // if (tokenUpdateError) {
    //   console.error("Token update failed:", tokenUpdateError.message);
    // }
  } catch (error) {
    console.error("Error in handleSuccessPayment:", error);
  }
}

async function handlePendingPayment(orderId) {
  console.log(`Payment pending for order: ${orderId}`);
}

async function handleFailedPayment(orderId) {
  try {
    console.log(`Payment failed for order: ${orderId}`);

    // Add actual values from notification
    // const { error: statusError } = await supabase
    //   .from("order")
    //   .update({
    //     payment_status: "failed",
    //     transaction_time: new Date().toISOString(), // Example timestamp
    //     gross_amount: 0, // Add actual value from notification
    //   })
    //   .eq("order_id", orderId);

    // if (statusError) {
    //   console.error("Status update failed:", statusError.message);
    // }

    const { data, error } = await supabase
      .from("donation")
      .update({ payment_status: "failed" })
      .eq("order_id", orderId)
      .select();

    if (data) {
      console.log("Donation updated:", data);
    }

    if (error) {
      console.error("Error updating donation:", error);
    }
  } catch (error) {
    console.error("Error in handleFailedPayment:", error);
  }
}

async function handleFraudulentPayment(orderId) {
  console.warn(`Fraudulent payment detected for order: ${orderId}`);
}

async function handleUnknownStatus(orderId, status) {
  console.error(`Unknown status ${status} for order: ${orderId}`);
}
