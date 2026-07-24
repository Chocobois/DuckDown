import { BaseScene } from "@/scenes/BaseScene";
import { Player } from "@/components/Player";
import { TileManager } from "@/components/TileManager";
import { Ship } from "@/components/Ship";
import { TileEntity } from "@/components/TileEntity";

export class GameScene extends BaseScene {
	private tileManager: TileManager;
	// private background: Phaser.GameObjects.Image;
	private player: Player;
	private ship: Ship;
	// private ui: UI;

	constructor() {
		super({ key: "GameScene" });
	}

	create(): void {
		this.fade(false, 200, 0x000000);
		this.cameras.main.setBackgroundColor(0xffffff);

		this.tileManager = new TileManager(this);
		this.tileManager.loadTilemap("tilemap_overworld1");

		// this.background = this.add.image(0, 0, "background");
		// this.background.setOrigin(0);
		// this.fitToScreen(this.background);

		this.player = new Player(this);
		this.player.on("move", this.onPlayerMove, this);
		this.player.on("action", () => {
			this.player.doABarrelRoll();
		});
		this.cameras.main.startFollow(this.player);
		this.moveEntityToTile(this.player, 28, 15);

		this.ship = new Ship(this);
		this.moveEntityToTile(this.ship, 24, 15);

		// this.ui = new UI(this);

		this.initTouchControls();
	}

	update(time: number, delta: number) {
		this.player.update(time, delta);
		this.ship.update(time, delta);
	}

	initTouchControls() {
		this.input.addPointer(2);

		// let touchArea = this.add.rectangle(0, 0, this.W, this.H, 0xFFFFFF).setOrigin(0).setAlpha(0.001);
		// touchArea.setInteractive({ useHandCursor: true, draggable: true });

		let touchId: number = -1;
		let touchButton: number = -1;

		this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
			if (!this.player.isTouched) {
				this.player.touchStart(pointer.x, pointer.y);
				touchId = pointer.id;
				touchButton = pointer.button;
			} else if (this.player.isTouched && !this.player.isTapped) {
				// Use second touch point as a trigger
				this.player.doABarrelRoll();
			}
		});

		this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
			if (touchId == pointer.id) {
				this.player.touchDrag(pointer.x, pointer.y);
			}
		});

		this.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
			if (touchId == pointer.id && touchButton == pointer.button) {
				// this.ui.debug.setText(`${new Date().getTime()} - id:${pointer.id} button:${pointer.button}`);
				this.player.touchEnd(pointer.x, pointer.y);
			}
		});
	}

	/* Player */

	moveEntityToTile(entity: TileEntity, tileX: number, tileY: number) {
		entity.tileX = tileX;
		entity.tileY = tileY;
		const { x, y } = this.tileManager.tileToCoord(tileX, tileY);
		entity.x = x;
		entity.y = y;
	}

	onPlayerMove(dx: number, dy: number) {
		const tx = this.player.tileX;
		const ty = this.player.tileY;
		const nx = tx + dx;
		const ny = ty + dy;

		const currentTile = this.tileManager.getTileAt(tx, ty);
		const nextTile = this.tileManager.getTileAt(nx, ny);

		if (this.isPlayerOnShip) {
			// Boat can move anywhere for now
			this.moveEntityToTile(this.player, nx, ny);

			// Move with boat on water
			if (nextTile == "Water") {
				this.moveEntityToTile(this.ship, nx, ny);
			}
			// Step onto land
			else {
				this.ship.setCaptain(null);
			}
		} else {
			// Prevent walking into water
			if (nextTile == "Water" && !this.hasShip(nx, ny)) {
				return;
			}

			// Move on land or onto boat
			this.moveEntityToTile(this.player, nx, ny);

			// Board ship
			if (this.hasShip(nx, ny)) {
				this.ship.setCaptain(this.player);
			}
		}
	}

	hasShip(tileX: number, tileY: number) {
		return tileX == this.ship.tileX && tileY == this.ship.tileY;
	}

	get isPlayerOnShip(): boolean {
		return (
			this.player.tileX == this.ship.tileX &&
			this.player.tileY == this.ship.tileY
		);
	}
}
