import Phaser from "phaser";
import { BaseScene } from "@/scenes/BaseScene";
import { TileEntity } from "./TileEntity";

const TAPPING_TIMER = 200; // ms

export class Player extends TileEntity {
	// Sprites
	private spriteSize: number;
	private sprite: Phaser.GameObjects.Sprite;
	private tween: Phaser.Tweens.Tween;

	// Controls
	private keyboard: any;
	public isTouched: boolean;
	public isTapped: boolean;
	private tappedTimer: number;
	private inputVec = new Phaser.Math.Vector2(0, 0); // Just used for keyboard -> vector
	private touchPos = new Phaser.Math.Vector2(0, 0);

	constructor(scene: BaseScene) {
		super(scene, "Player");

		/* Sprite */
		this.spriteSize = 128;
		this.sprite = this.scene.add.sprite(0, 0, "player");
		this.sprite.setOrigin(0.5, 1.0);
		this.sprite.y += this.spriteSize / 2;
		this.sprite.setScale(this.spriteSize / this.sprite.width);
		this.add(this.sprite);

		/* Controls */
		if (this.scene.input.keyboard) {
			this.keyboard = this.scene.input.keyboard.addKeys({
				up1: "W",
				down1: "S",
				left1: "A",
				right1: "D",
				up2: "Up",
				down2: "Down",
				left2: "Left",
				right2: "Right",
			});

			// Bind directional inputs directly to events
			const bindMove = (keys: any[], dx: number, dy: number) => {
				keys.forEach((key) => key.on("down", () => this.emit("move", dx, dy)));
			};

			bindMove([this.keyboard.left1, this.keyboard.left2], -1, 0);
			bindMove([this.keyboard.right1, this.keyboard.right2], 1, 0);
			bindMove([this.keyboard.up1, this.keyboard.up2], 0, -1);
			bindMove([this.keyboard.down1, this.keyboard.down2], 0, 1);

			this.scene.input.keyboard
				.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
				.on("down", this.doABarrelRoll, this);
		}
		this.isTouched = false;
		this.isTapped = false;
		this.tappedTimer = 0;
	}

	touchStart(x: number, y: number) {
		this.isTouched = true;
		this.isTapped = false;
		this.touchPos.x = x;
		this.touchPos.y = y;

		if (this.touchInsideBody(x, y)) {
			this.isTapped = true;
			this.tappedTimer = TAPPING_TIMER;
		}
	}

	touchDrag(x: number, y: number) {
		this.touchPos.x = x;
		this.touchPos.y = y;

		if (this.isTapped && !this.touchInsideBody(x, y)) {
			this.isTapped = false;
		}
	}

	touchEnd(x: number, y: number) {
		if (this.isTapped && this.tappedTimer > 0) {
			this.emit("action");
		}

		this.isTouched = false;
		this.isTapped = false;
	}

	touchInsideBody(x: number, y: number) {
		return Phaser.Math.Distance.Between(this.x, this.y, x, y) < this.spriteSize;
	}

	doABarrelRoll() {
		if (!this.tween || !this.tween.isActive()) {
			this.tween = this.scene.tweens.add({
				targets: this.sprite,
				scaleX: {
					from: this.sprite.scaleX,
					to: -this.sprite.scaleX,
					ease: "Cubic.InOut",
				},
				duration: 300,
				yoyo: true,
				onStart: () => {
					this.sprite.setFrame(1);
				},
				onComplete: () => {
					this.sprite.setFrame(0);
				},
			});
		}
	}
}
