import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261013200350 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "designer" add column if not exists "timeline" jsonb null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "designer" drop column if exists "timeline";`);
  }

}
