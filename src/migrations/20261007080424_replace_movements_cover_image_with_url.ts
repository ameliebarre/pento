import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."movements" DROP CONSTRAINT "movements_cover_image_id_media_id_fk";
   DROP INDEX "payload"."movements_cover_image_idx";
   ALTER TABLE "payload"."movements" DROP COLUMN "cover_image_id";
   ALTER TABLE "payload"."movements" ADD COLUMN "cover_image_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."movements" DROP COLUMN "cover_image_url";
   ALTER TABLE "payload"."movements" ADD COLUMN "cover_image_id" integer;
   ALTER TABLE "payload"."movements" ADD CONSTRAINT "movements_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
   CREATE INDEX "movements_cover_image_idx" ON "payload"."movements" USING btree ("cover_image_id");`)
}
