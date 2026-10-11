import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261010131841 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "designer" add column if not exists "featured" boolean not null default false;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "designer" drop column if exists "featured";`);
  }

}
