import { createClient } from "@supabase/supabase-js";

import { clientEnv } from "@/lib/env/client";
import { serverEnv } from "@/lib/env/server";

import type { Database } from "./types";

export function createAdminSupabaseClient() {
  const supabaseUrl = clientEnv.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = serverEnv.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Supabase admin environment variables are not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
