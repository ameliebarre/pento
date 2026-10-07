import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."designers" DROP CONSTRAINT "designers_image_id_media_id_fk";
  
  DROP INDEX "payload"."designers_image_idx";
  ALTER TABLE "payload"."designers" DROP COLUMN "image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."designers" ADD COLUMN "image_id" integer;
  ALTER TABLE "payload"."designers" ADD CONSTRAINT "designers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "designers_image_idx" ON "payload"."designers" USING btree ("image_id");`)
}
