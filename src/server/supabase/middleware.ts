import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabasePublicConfig } from "@/server/supabase/config";
import type { Database } from "@/server/supabase/types";

type SessionRefreshResult = {
  isConfigured: boolean;
  response: NextResponse;
  user: User | null;
};

export async function refreshSession(
  request: NextRequest,
): Promise<SessionRefreshResult> {
  let supabaseResponse = NextResponse.next({
    request,
  });

  let config: ReturnType<typeof getSupabasePublicConfig>;

  try {
    config = getSupabasePublicConfig();
  } catch {
    return {
      isConfigured: false,
      response: supabaseResponse,
      user: null,
    };
  }

  const supabase = createServerClient<Database>(
    config.supabaseUrl,
    config.supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return {
      isConfigured: true,
      response: supabaseResponse,
      user,
    };
  } catch {
    return {
      isConfigured: true,
      response: supabaseResponse,
      user: null,
    };
  }
}

export async function updateSession(request: NextRequest) {
  const { response } = await refreshSession(request);

  return response;
}
