import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { Categories } from "@/collections/Categories";
import { Products } from "@/collections/Products";

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  collections: [Categories, Products],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    schemaName: "payload",
  }),
});
