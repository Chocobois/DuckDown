import { BaseScene } from "@/scenes/BaseScene";
import { Player } from "@/components/Player";
import { TileManager } from "@/components/TileManager";

export class GameScene extends BaseScene {
	private tileManager: TileManager;
	// private background: Phaser.GameObjects.Image;
	private player: Player;
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
		this.onPlayerSetTile(28, 15);

		// this.ui = new UI(this);

		this.initTouchControls();
	}

	update(time: number, delta: number) {
		this.player.update(time, delta);
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

	onPlayerSetTile(tileX: number, tileY: number) {
		this.player.tileX = tileX;
		this.player.tileY = tileY;

		const { x, y } = this.tileManager.tileToCoord(tileX, tileY);
		this.player.x = x;
		this.player.y = y;
	}

	onPlayerMove(dx: number, dy: number) {
		const tx = this.player.tileX;
		const ty = this.player.tileY;

		const currentTile = this.tileManager.getTileAt(tx, ty);
		const nextTile = this.tileManager.getTileAt(tx + dx, ty + dy);

		// if (nextTile == "Water")
		this.onPlayerSetTile(tx + dx, ty + dy);
	}
}
