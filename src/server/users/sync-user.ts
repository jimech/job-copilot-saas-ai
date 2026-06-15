import type { User } from "@supabase/supabase-js";

import { getDb } from "@/server/db/client";
import { profiles, subscriptions, users } from "@/server/db/schema";

function getStringMetadataValue(value: unknown) {
  return typeof value === "string" ? value : null;
}

function getTargetRolesMetadataValue(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((role): role is string => typeof role === "string");
}

export async function syncAuthUserToDatabase(user: User) {
  if (!user.email) {
    throw new Error("Cannot sync user without email.");
  }

  const db = getDb();
  const metadata = user.user_metadata ?? {};
  const fullName = getStringMetadataValue(metadata.full_name);
  const country = getStringMetadataValue(metadata.country);
  const preferredLanguage =
    getStringMetadataValue(metadata.preferred_language) ?? "en";
  const targetRoles = getTargetRolesMetadataValue(metadata.target_roles);
  const now = new Date();

  await db
    .insert(users)
    .values({
      id: user.id,
      email: user.email,
      fullName,
      country,
      preferredLanguage,
      targetRoles,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        email: user.email,
        fullName,
        country,
        preferredLanguage,
        targetRoles,
        updatedAt: now,
      },
    });

  await db
    .insert(profiles)
    .values({
      userId: user.id,
      location: country,
    })
    .onConflictDoNothing({
      target: profiles.userId,
    });

  await db
    .insert(subscriptions)
    .values({
      userId: user.id,
      plan: "free",
      status: "incomplete",
      aiCreditsRemaining: 0,
    })
    .onConflictDoNothing({
      target: subscriptions.userId,
    });
}
