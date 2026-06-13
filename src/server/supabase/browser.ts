import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicConfig } from "./config";
import type { Database } from "./types";

export function createBrowserSupabaseClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabasePublicConfig();

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
