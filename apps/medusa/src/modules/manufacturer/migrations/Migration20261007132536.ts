import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261007132536 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "manufacturer" drop constraint if exists "manufacturer_slug_unique";`);
    this.addSql(`create table if not exists "manufacturer" ("id" text not null, "slug" text not null, "name" text not null, "history" text null, "website" text null, "logo_url" text null, "country_name" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "manufacturer_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_manufacturer_slug_unique" ON "manufacturer" ("slug") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_manufacturer_deleted_at" ON "manufacturer" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "manufacturer" cascade;`);
  }

}
