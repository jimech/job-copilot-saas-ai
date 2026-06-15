import { NextResponse } from "next/server";

import { getCurrentUser } from "@/server/auth";
import { syncAuthUserToDatabase } from "@/server/users/sync-user";

export async function POST() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await syncAuthUserToDatabase(user);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "We could not finish setting up your account." },
      { status: 500 },
    );
  }
}
