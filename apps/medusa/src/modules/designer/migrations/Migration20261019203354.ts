import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261019203354 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "designer" add column if not exists "similar_designers" jsonb null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "designer" drop column if exists "similar_designers";`);
  }

}
