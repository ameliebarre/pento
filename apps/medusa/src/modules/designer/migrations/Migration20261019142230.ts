import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20261019142230 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "designer" add column if not exists "in_focus" jsonb null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "designer" drop column if exists "in_focus";`);
  }

}
