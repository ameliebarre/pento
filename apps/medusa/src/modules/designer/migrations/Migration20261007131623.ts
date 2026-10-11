import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261007131623 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "designer" drop constraint if exists "designer_slug_unique";`);
    this.addSql(`create table if not exists "designer" ("id" text not null, "slug" text not null, "first_name" text not null, "last_name" text not null, "birth_date" timestamptz null, "death_date" timestamptz null, "nationality" text null, "biography" text not null, "quote" text null, "image_url" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "designer_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_designer_slug_unique" ON "designer" ("slug") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_designer_deleted_at" ON "designer" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "designer" cascade;`);
  }

}
