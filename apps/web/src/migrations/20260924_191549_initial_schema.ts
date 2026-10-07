import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE SCHEMA IF NOT EXISTS "payload";
   CREATE TABLE "payload"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload"."countries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"position" numeric,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."designers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"birth_date" timestamp(3) with time zone,
  	"death_date" timestamp(3) with time zone,
  	"nationality" varchar,
  	"biography" varchar NOT NULL,
  	"quote" varchar,
  	"image_id" integer,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."manufacturers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"history" varchar,
  	"website" varchar,
  	"logo_id" integer,
  	"country_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."movements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"cover_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."materials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"sku" varchar,
  	"description" jsonb NOT NULL,
  	"price" numeric NOT NULL,
  	"currency" varchar DEFAULT 'EUR',
  	"stock" numeric DEFAULT 0 NOT NULL,
  	"sales_count" numeric DEFAULT 0 NOT NULL,
  	"width" numeric,
  	"height" numeric,
  	"depth" numeric,
  	"weight" numeric,
  	"creation_date" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"category_id" integer,
  	"manufacturer_id" integer,
  	"movement_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"designers_id" integer,
  	"media_id" integer,
  	"tags_id" integer,
  	"materials_id" integer
  );
  
  CREATE TABLE "payload"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "payload"."users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"countries_id" integer,
  	"categories_id" integer,
  	"designers_id" integer,
  	"manufacturers_id" integer,
  	"movements_id" integer,
  	"materials_id" integer,
  	"tags_id" integer,
  	"products_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."hero_banner" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer NOT NULL,
  	"heading" varchar DEFAULT 'Timeless design,' NOT NULL,
  	"heading_accent" varchar DEFAULT 'curated with reverence.' NOT NULL,
  	"description" varchar NOT NULL,
  	"cta_label" varchar DEFAULT 'Explore the collection' NOT NULL,
  	"cta_href" varchar DEFAULT '/products' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."passion_for_design_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."passion_for_design" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"eyebrow" varchar DEFAULT 'A passion for enduring design' NOT NULL,
  	"heading" varchar DEFAULT 'Objects with a story.' NOT NULL,
  	"heading_accent" varchar DEFAULT 'Pieces with a soul.' NOT NULL,
  	"description" varchar DEFAULT 'Pento was born from a simple belief: great design deserves to live on. We curate iconic furniture and objects that have shaped the history of design — pieces imagined by visionary designers, produced with exceptional craftsmanship, and made to transcend generations. From celebrated classics to lesser-known gems, every piece in our collection has a story worth telling.
  
  For us, buying design is not simply about furnishing a space. It is about choosing objects that speak to us, discovering the ideas and people behind them, and bringing a piece of design history into our everyday lives.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload"."categories" ADD CONSTRAINT "categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."designers" ADD CONSTRAINT "designers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."manufacturers" ADD CONSTRAINT "manufacturers_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."manufacturers" ADD CONSTRAINT "manufacturers_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "payload"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."movements" ADD CONSTRAINT "movements_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "payload"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."products" ADD CONSTRAINT "products_manufacturer_id_manufacturers_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "payload"."manufacturers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."products" ADD CONSTRAINT "products_movement_id_movements_id_fk" FOREIGN KEY ("movement_id") REFERENCES "payload"."movements"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."products_rels" ADD CONSTRAINT "products_rels_designers_fk" FOREIGN KEY ("designers_id") REFERENCES "payload"."designers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."products_rels" ADD CONSTRAINT "products_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."products_rels" ADD CONSTRAINT "products_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."products_rels" ADD CONSTRAINT "products_rels_materials_fk" FOREIGN KEY ("materials_id") REFERENCES "payload"."materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "payload"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "payload"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_designers_fk" FOREIGN KEY ("designers_id") REFERENCES "payload"."designers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_manufacturers_fk" FOREIGN KEY ("manufacturers_id") REFERENCES "payload"."manufacturers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_movements_fk" FOREIGN KEY ("movements_id") REFERENCES "payload"."movements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_materials_fk" FOREIGN KEY ("materials_id") REFERENCES "payload"."materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "payload"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "payload"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."hero_banner" ADD CONSTRAINT "hero_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."passion_for_design_values" ADD CONSTRAINT "passion_for_design_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."passion_for_design"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."passion_for_design" ADD CONSTRAINT "passion_for_design_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "payload"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "payload"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "payload"."media" USING btree ("filename");
  CREATE UNIQUE INDEX "countries_name_idx" ON "payload"."countries" USING btree ("name");
  CREATE INDEX "countries_updated_at_idx" ON "payload"."countries" USING btree ("updated_at");
  CREATE INDEX "countries_created_at_idx" ON "payload"."countries" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "payload"."categories" USING btree ("slug");
  CREATE UNIQUE INDEX "categories_position_idx" ON "payload"."categories" USING btree ("position");
  CREATE INDEX "categories_image_idx" ON "payload"."categories" USING btree ("image_id");
  CREATE INDEX "categories_updated_at_idx" ON "payload"."categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "payload"."categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "designers_slug_idx" ON "payload"."designers" USING btree ("slug");
  CREATE INDEX "designers_image_idx" ON "payload"."designers" USING btree ("image_id");
  CREATE INDEX "designers_updated_at_idx" ON "payload"."designers" USING btree ("updated_at");
  CREATE INDEX "designers_created_at_idx" ON "payload"."designers" USING btree ("created_at");
  CREATE UNIQUE INDEX "manufacturers_slug_idx" ON "payload"."manufacturers" USING btree ("slug");
  CREATE INDEX "manufacturers_logo_idx" ON "payload"."manufacturers" USING btree ("logo_id");
  CREATE INDEX "manufacturers_country_idx" ON "payload"."manufacturers" USING btree ("country_id");
  CREATE INDEX "manufacturers_updated_at_idx" ON "payload"."manufacturers" USING btree ("updated_at");
  CREATE INDEX "manufacturers_created_at_idx" ON "payload"."manufacturers" USING btree ("created_at");
  CREATE UNIQUE INDEX "movements_slug_idx" ON "payload"."movements" USING btree ("slug");
  CREATE UNIQUE INDEX "movements_name_idx" ON "payload"."movements" USING btree ("name");
  CREATE INDEX "movements_cover_image_idx" ON "payload"."movements" USING btree ("cover_image_id");
  CREATE INDEX "movements_updated_at_idx" ON "payload"."movements" USING btree ("updated_at");
  CREATE INDEX "movements_created_at_idx" ON "payload"."movements" USING btree ("created_at");
  CREATE UNIQUE INDEX "materials_slug_idx" ON "payload"."materials" USING btree ("slug");
  CREATE UNIQUE INDEX "materials_name_idx" ON "payload"."materials" USING btree ("name");
  CREATE INDEX "materials_updated_at_idx" ON "payload"."materials" USING btree ("updated_at");
  CREATE INDEX "materials_created_at_idx" ON "payload"."materials" USING btree ("created_at");
  CREATE UNIQUE INDEX "tags_name_idx" ON "payload"."tags" USING btree ("name");
  CREATE INDEX "tags_updated_at_idx" ON "payload"."tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "payload"."tags" USING btree ("created_at");
  CREATE UNIQUE INDEX "products_name_idx" ON "payload"."products" USING btree ("name");
  CREATE UNIQUE INDEX "products_sku_idx" ON "payload"."products" USING btree ("sku");
  CREATE INDEX "products_category_idx" ON "payload"."products" USING btree ("category_id");
  CREATE INDEX "products_manufacturer_idx" ON "payload"."products" USING btree ("manufacturer_id");
  CREATE INDEX "products_movement_idx" ON "payload"."products" USING btree ("movement_id");
  CREATE INDEX "products_updated_at_idx" ON "payload"."products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "payload"."products" USING btree ("created_at");
  CREATE INDEX "products_rels_order_idx" ON "payload"."products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "payload"."products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "payload"."products_rels" USING btree ("path");
  CREATE INDEX "products_rels_designers_id_idx" ON "payload"."products_rels" USING btree ("designers_id");
  CREATE INDEX "products_rels_media_id_idx" ON "payload"."products_rels" USING btree ("media_id");
  CREATE INDEX "products_rels_tags_id_idx" ON "payload"."products_rels" USING btree ("tags_id");
  CREATE INDEX "products_rels_materials_id_idx" ON "payload"."products_rels" USING btree ("materials_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload"."payload_kv" USING btree ("key");
  CREATE INDEX "users_sessions_order_idx" ON "payload"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "payload"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "payload"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "payload"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "payload"."users" USING btree ("email");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_countries_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("countries_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_designers_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("designers_id");
  CREATE INDEX "payload_locked_documents_rels_manufacturers_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("manufacturers_id");
  CREATE INDEX "payload_locked_documents_rels_movements_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("movements_id");
  CREATE INDEX "payload_locked_documents_rels_materials_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("materials_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload"."payload_migrations" USING btree ("created_at");
  CREATE INDEX "hero_banner_background_image_idx" ON "payload"."hero_banner" USING btree ("background_image_id");
  CREATE INDEX "passion_for_design_values_order_idx" ON "payload"."passion_for_design_values" USING btree ("_order");
  CREATE INDEX "passion_for_design_values_parent_id_idx" ON "payload"."passion_for_design_values" USING btree ("_parent_id");
  CREATE INDEX "passion_for_design_image_idx" ON "payload"."passion_for_design" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."media" CASCADE;
  DROP TABLE "payload"."countries" CASCADE;
  DROP TABLE "payload"."categories" CASCADE;
  DROP TABLE "payload"."designers" CASCADE;
  DROP TABLE "payload"."manufacturers" CASCADE;
  DROP TABLE "payload"."movements" CASCADE;
  DROP TABLE "payload"."materials" CASCADE;
  DROP TABLE "payload"."tags" CASCADE;
  DROP TABLE "payload"."products" CASCADE;
  DROP TABLE "payload"."products_rels" CASCADE;
  DROP TABLE "payload"."payload_kv" CASCADE;
  DROP TABLE "payload"."users_sessions" CASCADE;
  DROP TABLE "payload"."users" CASCADE;
  DROP TABLE "payload"."payload_locked_documents" CASCADE;
  DROP TABLE "payload"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload"."payload_preferences" CASCADE;
  DROP TABLE "payload"."payload_preferences_rels" CASCADE;
  DROP TABLE "payload"."payload_migrations" CASCADE;
  DROP TABLE "payload"."hero_banner" CASCADE;
  DROP TABLE "payload"."passion_for_design_values" CASCADE;
  DROP TABLE "payload"."passion_for_design" CASCADE;`)
}
