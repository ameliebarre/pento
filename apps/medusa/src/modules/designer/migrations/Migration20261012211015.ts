import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261012211015 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "designer" drop column if exists "design_language", add column if not exists "death_place" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "designer" drop column if exists "death_place", add column if not exists "design_language" text null;`);
  }

}
