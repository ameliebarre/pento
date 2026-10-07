import * as migration_20260924_191549_initial_schema from './20260924_191549_initial_schema';
import * as migration_20260928_064529_drop_designers_image_relationship from './20260928_064529_drop_designers_image_relationship';
import * as migration_20260928_064542_add_designers_image_url from './20260928_064542_add_designers_image_url';
import * as migration_20260928_140251_drop_categories_image_relationship from './20260928_140251_drop_categories_image_relationship';
import * as migration_20260928_140404_add_categories_image_url from './20260928_140404_add_categories_image_url';
import * as migration_20261006205942_replace_media_relations_with_urls from './20261006205942_replace_media_relations_with_urls';
import * as migration_20261007080424_replace_movements_cover_image_with_url from './20261007080424_replace_movements_cover_image_with_url';

export const migrations = [
  {
    up: migration_20260924_191549_initial_schema.up,
    down: migration_20260924_191549_initial_schema.down,
    name: '20260924_191549_initial_schema',
  },
  {
    up: migration_20260928_064529_drop_designers_image_relationship.up,
    down: migration_20260928_064529_drop_designers_image_relationship.down,
    name: '20260928_064529_drop_designers_image_relationship',
  },
  {
    up: migration_20260928_064542_add_designers_image_url.up,
    down: migration_20260928_064542_add_designers_image_url.down,
    name: '20260928_064542_add_designers_image_url',
  },
  {
    up: migration_20260928_140251_drop_categories_image_relationship.up,
    down: migration_20260928_140251_drop_categories_image_relationship.down,
    name: '20260928_140251_drop_categories_image_relationship',
  },
  {
    up: migration_20260928_140404_add_categories_image_url.up,
    down: migration_20260928_140404_add_categories_image_url.down,
    name: '20260928_140404_add_categories_image_url'
  },
  {
    up: migration_20261006205942_replace_media_relations_with_urls.up,
    down: migration_20261006205942_replace_media_relations_with_urls.down,
    name: '20261006205942_replace_media_relations_with_urls',
  },
  {
    up: migration_20261007080424_replace_movements_cover_image_with_url.up,
    down: migration_20261007080424_replace_movements_cover_image_with_url.down,
    name: '20261007080424_replace_movements_cover_image_with_url',
  },
];
