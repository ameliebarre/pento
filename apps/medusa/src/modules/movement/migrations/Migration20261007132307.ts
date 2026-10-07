import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261007132307 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "movement" drop constraint if exists "movement_name_unique";`);
    this.addSql(`alter table if exists "movement" drop constraint if exists "movement_slug_unique";`);
    this.addSql(`create table if not exists "movement" ("id" text not null, "slug" text not null, "name" text not null, "description" text not null, "start_date" timestamptz null, "end_date" timestamptz null, "cover_image_url" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "movement_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_movement_slug_unique" ON "movement" ("slug") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_movement_name_unique" ON "movement" ("name") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_movement_deleted_at" ON "movement" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "movement" cascade;`);
  }

}
