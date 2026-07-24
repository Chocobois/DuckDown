import Phaser from "phaser";
import { BaseScene } from "@/scenes/BaseScene";
// import { Tile, TileCoord } from "./Tile";
// import { LevelKey } from "./levels";

export const Tile = [
	"Water",
	"Grass",
	"Stone",
	"Sand",
	"Bridge",
	"Down",
	"Duck",
	"Eggs",
] as const;
export type Tile = (typeof Tile)[number];

export class TileManager extends Phaser.GameObjects.Container {
	public scene: BaseScene;

	private map: Phaser.Tilemaps.Tilemap;
	private tiles: Tile[][];

	constructor(scene: BaseScene) {
		super(scene);
		this.scene = scene;
		scene.add.existing(this);
	}

	loadTilemap(tilemapKey: string) {
		this.map = this.scene.make.tilemap({ key: tilemapKey });
		this.width = this.map.width;
		this.height = this.map.height;

		console.log(
			`TileManager: Loaded ${tilemapKey} (${this.width}x${this.height})`,
		);

		/* Tilesets */

		const tilesetOverworld = this.map.addTilesetImage(
			"Overworld", // Name of tileset in Tiled
			"tileset_overworld", // assets.ts
		);
		if (!tilesetOverworld) throw Error("Tileset 'Overworld' not found");

		/* Graphics */

		const firstLayer = this.map.createLayer("first_layer", tilesetOverworld);
		const secondLayer = this.map.createLayer("second_layer", tilesetOverworld);
		if (!firstLayer) throw Error("Layer 'first_layer' not found");
		if (!secondLayer) throw Error("Layer 'second_layer' not found");

		this.add(firstLayer);

		/* Tiles */

		this.tiles = [];
		for (let y = 0; y < this.height; y++) {
			this.tiles[y] = [];
			for (let x = 0; x < this.width; x++) {
				const index = firstLayer.getTileAt(x, y).index - 1;
				const tile = Tile[index];
				this.tiles[y][x] = tile;

				// const wallTile = layer.data[y][x];
				// if (wallTile && wallTile.index !== -1) {
				// 	this.tiles[y][x] = this.mapTileToEnum(wallTile);
				// }
			}
		}

		/* Out of bounds texture */

		// const innerLeft = 8;
		// const innerTop = 8;
		// const innerWidth = 16 * (this.width - 1);
		// const innerHeight = 16 * (this.height - 1);
		// const inner = this.scene.add
		// 	.rectangle(innerLeft, innerTop, innerWidth, innerHeight, 0x63ad9d)
		// 	.setOrigin(0);
		// this.add(inner);
		// this.sendToBack(inner);

		// const outerLeft = innerLeft - 40 * 16;
		// const outerTop = innerTop - 40 * 16;
		// const outerWidth = innerWidth + 80 * 16;
		// const outerHeight = innerHeight + 80 * 16;
		// const outer = this.scene.add
		// 	.tileSprite(outerLeft, outerTop, outerWidth, outerHeight, "out_of_bounds")
		// 	.setOrigin(0)
		// 	.setDepth(-2);
		// this.add(outer);
		// this.sendToBack(outer);

		// return entityTiles;
	}

	// 	private mapTileToEnum(tile: Phaser.Tilemaps.Tile): Tile {
	// 		switch (tile.properties.tile) {
	// 			// Walls
	// 			case "Wall":
	// 				return Tile.Wall;
	// 			case "Platform":
	// 				return Tile.Platform;

	// 			// Entities
	// 			case "Home":
	// 				return Tile.Home;
	// 			case "Gold":
	// 				return Tile.Gold;
	// 			case "Climb":
	// 				return Tile.Climb;
	// 			case "Death":
	// 				return Tile.Death;

	// 			default:
	// 				console.warn(`Unknown tile property: ${tile.properties.tile}`);
	// 				return Tile.None;
	// 		}
	// 	}

	// 	public isInside({ x, y }: TileCoord): boolean {
	// 		return x >= 0 && y >= 0 && x < this.width && y < this.height;
	// 	}

	// 	public getTileAt(tileCoord: TileCoord): Tile {
	// 		if (!this.isInside(tileCoord)) return "Wall";

	// 		// Otherwise return the static tile type
	// 		return this.tiles[tileCoord.y]?.[tileCoord.x] ?? "None";
	// 	}

	// 	public getLevelBounds(): Phaser.Geom.Rectangle {
	// 		let minX = this.width;
	// 		let minY = this.height;
	// 		let maxX = -1;
	// 		let maxY = -1;

	// 		for (let y = 0; y < this.height; y++) {
	// 			for (let x = 0; x < this.width; x++) {
	// 				const tile = this.tiles[y]?.[x];

	// 				if (tile !== Tile.Wall) {
	// 					if (x < minX) minX = x;
	// 					if (y < minY) minY = y;
	// 					if (x > maxX) maxX = x;
	// 					if (y > maxY) maxY = y;
	// 				}
	// 			}
	// 		}

	// 		return new Phaser.Geom.Rectangle(minX, minY, maxX - minX, maxY - minY);
	// 	}

	// 	get widthInPixels(): number {
	// 		return this.map.widthInPixels;
	// 	}

	// 	get heightInPixels(): number {
	// 		return this.map.heightInPixels;
	// 	}
}
