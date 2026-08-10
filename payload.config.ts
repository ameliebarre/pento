import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { Categories } from "@/collections/Categories";
import { Countries } from "@/collections/Countries";
import { Designers } from "@/collections/Designers";
import { Manufacturers } from "@/collections/Manufacturers";
import { Materials } from "@/collections/Materials";
import { Media } from "@/collections/Media";
import { Movements } from "@/collections/Movements";
import { Products } from "@/collections/Products";
import { Tags } from "@/collections/Tags";

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  collections: [
    Media,
    Countries,
    Categories,
    Designers,
    Manufacturers,
    Movements,
    Materials,
    Tags,
    Products,
  ],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    schemaName: "payload",
  }),
});
