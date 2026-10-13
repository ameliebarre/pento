import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261012205553 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "designer" add column if not exists "birth_place" text null, add column if not exists "profession" text null, add column if not exists "design_movement" text null, add column if not exists "design_language" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "designer" drop column if exists "birth_place", drop column if exists "profession", drop column if exists "design_movement", drop column if exists "design_language";`);
  }

}
