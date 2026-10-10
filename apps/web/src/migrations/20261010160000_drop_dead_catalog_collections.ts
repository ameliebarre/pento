import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// The product catalog (categories, designers, manufacturers, materials,
// movements, countries, tags, products) now lives entirely in apps/medusa.
// These Payload collections were a pre-Medusa leftover kept around only for
// homepage curation (featured flags, category images/order), which has been
// ported to Medusa metadata/fields. Dropping them here.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_designers_fk";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_manufacturers_fk";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_movements_fk";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_materials_fk";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_countries_fk";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tags_fk";
   DROP INDEX "payload"."payload_locked_documents_rels_categories_id_idx";
   DROP INDEX "payload"."payload_locked_documents_rels_products_id_idx";
   DROP INDEX "payload"."payload_locked_documents_rels_designers_id_idx";
   DROP INDEX "payload"."payload_locked_documents_rels_manufacturers_id_idx";
   DROP INDEX "payload"."payload_locked_documents_rels_movements_id_idx";
   DROP INDEX "payload"."payload_locked_documents_rels_materials_id_idx";
   DROP INDEX "payload"."payload_locked_documents_rels_countries_id_idx";
   DROP INDEX "payload"."payload_locked_documents_rels_tags_id_idx";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "categories_id";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "products_id";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "designers_id";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "manufacturers_id";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "movements_id";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "materials_id";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "countries_id";
   ALTER TABLE "payload"."payload_locked_documents_rels" DROP COLUMN "tags_id";

   DROP TABLE IF EXISTS "payload"."products_images" CASCADE;
   DROP TABLE IF EXISTS "payload"."products_rels" CASCADE;
   DROP TABLE IF EXISTS "payload"."products" CASCADE;
   DROP TABLE IF EXISTS "payload"."categories" CASCADE;
   DROP TABLE IF EXISTS "payload"."countries" CASCADE;
   DROP TABLE IF EXISTS "payload"."designers" CASCADE;
   DROP TABLE IF EXISTS "payload"."manufacturers" CASCADE;
   DROP TABLE IF EXISTS "payload"."materials" CASCADE;
   DROP TABLE IF EXISTS "payload"."movements" CASCADE;
   DROP TABLE IF EXISTS "payload"."tags" CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
   ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "products_id" integer;
   ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "designers_id" integer;
   ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "manufacturers_id" integer;
   ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "movements_id" integer;
   ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "materials_id" integer;
   ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "countries_id" integer;
   ALTER TABLE "payload"."payload_locked_documents_rels" ADD COLUMN "tags_id" integer;`)

  // The catalog tables themselves (categories, designers, manufacturers,
  // materials, movements, countries, tags, products) are not recreated —
  // their data was already migrated to apps/medusa before this migration
  // ran, and dropping them here is a one-way cleanup, not a schema change
  // to roll back. Restore from a database backup if the tables are needed.
  throw new Error(
    'Cannot restore the dropped catalog tables (categories, designers, manufacturers, materials, movements, countries, tags, products) — their data now lives in apps/medusa. Restore from a backup if needed.',
  )
}
