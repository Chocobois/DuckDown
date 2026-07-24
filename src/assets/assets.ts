import { Image, SpriteSheet, Audio, tilemap, Tilemap } from "./util";
import { image, sound, music, loadFont, spritesheet } from "./util";

/* Images */
const images: Image[] = [
	// Backgrounds
	image("backgrounds/background", "background"),

	// Characters
	// image("characters/player", "player"),


	// Dockscene
	image('backgrounds/dock_background', 'dock_background'),
	image('shop/overworld_shop', 'overworld_shop'),

	// Items
	image("items/coin", "coin"),

	// UI
	image("ui/hud", "hud"),

	// Titlescreen
	image("titlescreen/sky", "title_sky"),
	image("titlescreen/background", "title_background"),
	image("titlescreen/foreground", "title_foreground"),
	image("titlescreen/character", "title_character"),
];

/* Spritesheets */
const spritesheets: SpriteSheet[] = [
	spritesheet("tilesets/overworld", "tileset_overworld", 128, 128),
	spritesheet("player", "player", 128, 128),
	spritesheet("ship", "ship", 128, 128),
];

/* Tilemaps */

export const tilemaps: Tilemap[] = [
	tilemap("Overworld1.json", "tilemap_overworld1"),
];

/* Audios */
const audios: Audio[] = [
	music("title", "m_main_menu"),
	music("first", "m_first"),
	sound("tree/rustle", "t_rustle", 0.5),
];

/* Fonts */
await loadFont("DynaPuff-Medium", "Game Font");

export { images, spritesheets, audios };
