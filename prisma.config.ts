import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Prisma CLI reads .env by default; load .env.local so credentials are available
// during `prisma migrate dev` without duplicating secrets.
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Pooled connection for runtime queries (PgBouncer)
    url: process.env.DATABASE_URL!,
    // Direct connection for migrations (bypasses PgBouncer transaction mode)
    directUrl: process.env.DIRECT_URL!,
  },
});
