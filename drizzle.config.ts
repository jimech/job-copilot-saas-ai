import { defineConfig } from "drizzle-kit";
import { existsSync, readFileSync } from "node:fs";

function readLocalDatabaseUrl() {
  if (!existsSync(".env.local")) {
    return undefined;
  }

  const match = readFileSync(".env.local", "utf8").match(/^DATABASE_URL=(.*)$/m);
  const value = match?.[1]?.trim();

  if (!value) {
    return undefined;
  }

  return value.replace(/^["']|["']$/g, "");
}

const databaseUrl = process.env.DATABASE_URL ?? readLocalDatabaseUrl();

export default defineConfig({
  schema: "./src/server/db/schema/index.ts",
  out: "./src/server/db/migrations",
  dialect: "postgresql",
  ...(databaseUrl
    ? {
        dbCredentials: {
          url: databaseUrl,
        },
      }
    : {}),
});
