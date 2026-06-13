import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { serverEnv } from "@/lib/env/server";

import * as schema from "./schema";

function createDatabaseClient() {
  if (!serverEnv.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const queryClient = postgres(serverEnv.DATABASE_URL, {
    prepare: false,
  });

  return drizzle(queryClient, { schema });
}

let dbInstance: ReturnType<typeof createDatabaseClient> | null = null;

export function getDb() {
  if (!dbInstance) {
    dbInstance = createDatabaseClient();
  }

  return dbInstance;
}
