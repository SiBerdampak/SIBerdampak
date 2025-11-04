import { createClient } from "./supabase/server";

// Create a single supabase client for interacting with your database
export const supabase = await createClient();
