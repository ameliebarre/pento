import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";

import { Categories } from "@/collections/Categories";

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  collections: [Categories],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    // Dedicated schema so Payload's introspection doesn't have to scan the
    // large, unrelated Prisma-managed `public` schema in the same database.
    schemaName: "payload",
  }),
});
