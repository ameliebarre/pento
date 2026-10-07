import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."categories" DROP CONSTRAINT "categories_image_id_media_id_fk";
  
  DROP INDEX "payload"."categories_image_idx";
  ALTER TABLE "payload"."categories" DROP COLUMN "image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."categories" ADD COLUMN "image_id" integer;
  ALTER TABLE "payload"."categories" ADD CONSTRAINT "categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "categories_image_idx" ON "payload"."categories" USING btree ("image_id");`)
}
