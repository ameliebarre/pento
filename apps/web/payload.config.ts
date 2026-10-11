import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { Media } from "@/collections/Media";
import { HeroBanner } from "@/globals/HeroBanner";
import { PassionForDesign } from "@/globals/PassionForDesign";

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  collections: [Media],
  globals: [HeroBanner, PassionForDesign],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    schemaName: "payload",
  }),
});
