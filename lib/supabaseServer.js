import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    cookies: {
      get(name) {
        return cookies().get(name)?.value;
      },
    },
  });
}


