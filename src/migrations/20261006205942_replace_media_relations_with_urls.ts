import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // hero_banner.backgroundImage (relationship) -> backgroundImageUrl (text)
  await db.execute(sql`
   ALTER TABLE "payload"."hero_banner" DROP CONSTRAINT "hero_banner_background_image_id_media_id_fk";
   DROP INDEX "payload"."hero_banner_background_image_idx";
   ALTER TABLE "payload"."hero_banner" DROP COLUMN "background_image_id";
   ALTER TABLE "payload"."hero_banner" ADD COLUMN "background_image_url" varchar NOT NULL DEFAULT '';`)

  // passion_for_design.image (relationship) -> imageUrl (text)
  await db.execute(sql`
   ALTER TABLE "payload"."passion_for_design" DROP CONSTRAINT "passion_for_design_image_id_media_id_fk";
   DROP INDEX "payload"."passion_for_design_image_idx";
   ALTER TABLE "payload"."passion_for_design" DROP COLUMN "image_id";
   ALTER TABLE "payload"."passion_for_design" ADD COLUMN "image_url" varchar NOT NULL DEFAULT '';`)

  // manufacturers.logo (relationship) -> logoUrl (text)
  await db.execute(sql`
   ALTER TABLE "payload"."manufacturers" DROP CONSTRAINT "manufacturers_logo_id_media_id_fk";
   DROP INDEX "payload"."manufacturers_logo_idx";
   ALTER TABLE "payload"."manufacturers" DROP COLUMN "logo_id";
   ALTER TABLE "payload"."manufacturers" ADD COLUMN "logo_url" varchar;`)

  // products.images (hasMany relationship, stored via products_rels.media_id) -> array field (dedicated table)
  await db.execute(sql`
   DELETE FROM "payload"."products_rels" WHERE "path" = 'images';
   ALTER TABLE "payload"."products_rels" DROP CONSTRAINT "products_rels_media_fk";
   DROP INDEX "payload"."products_rels_media_id_idx";
   ALTER TABLE "payload"."products_rels" DROP COLUMN "media_id";
   CREATE TABLE "payload"."products_images" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "url" varchar NOT NULL,
    "alt" varchar NOT NULL
   );
   ALTER TABLE "payload"."products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."products"("id") ON DELETE cascade ON UPDATE no action;
   CREATE INDEX "products_images_order_idx" ON "payload"."products_images" USING btree ("_order");
   CREATE INDEX "products_images_parent_id_idx" ON "payload"."products_images" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."products_images";
   ALTER TABLE "payload"."products_rels" ADD COLUMN "media_id" integer;
   ALTER TABLE "payload"."products_rels" ADD CONSTRAINT "products_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
   CREATE INDEX "products_rels_media_id_idx" ON "payload"."products_rels" USING btree ("media_id");

   ALTER TABLE "payload"."manufacturers" DROP COLUMN "logo_url";
   ALTER TABLE "payload"."manufacturers" ADD COLUMN "logo_id" integer;
   ALTER TABLE "payload"."manufacturers" ADD CONSTRAINT "manufacturers_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
   CREATE INDEX "manufacturers_logo_idx" ON "payload"."manufacturers" USING btree ("logo_id");

   ALTER TABLE "payload"."passion_for_design" DROP COLUMN "image_url";
   ALTER TABLE "payload"."passion_for_design" ADD COLUMN "image_id" integer NOT NULL;
   ALTER TABLE "payload"."passion_for_design" ADD CONSTRAINT "passion_for_design_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
   CREATE INDEX "passion_for_design_image_idx" ON "payload"."passion_for_design" USING btree ("image_id");

   ALTER TABLE "payload"."hero_banner" DROP COLUMN "background_image_url";
   ALTER TABLE "payload"."hero_banner" ADD COLUMN "background_image_id" integer NOT NULL;
   ALTER TABLE "payload"."hero_banner" ADD CONSTRAINT "hero_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
   CREATE INDEX "hero_banner_background_image_idx" ON "payload"."hero_banner" USING btree ("background_image_id");`)
}
