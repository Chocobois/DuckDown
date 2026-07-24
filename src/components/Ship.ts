import Phaser from "phaser";
import { BaseScene } from "@/scenes/BaseScene";
import { TileEntity } from "./TileEntity";

export class Ship extends TileEntity {
	public captain: TileEntity | null = null;

	private spriteSize: number;
	private sprite: Phaser.GameObjects.Sprite;

	constructor(scene: BaseScene) {
		super(scene);

		/* Sprite */
		this.spriteSize = 128;
		this.sprite = this.scene.add.sprite(0, 0, "ship");
		this.sprite.setOrigin(0.5, 1.0);
		this.sprite.y += this.spriteSize / 2;
		this.sprite.setScale(this.spriteSize / this.sprite.width);
		this.add(this.sprite);
	}

	update(time: number, delta: number) {
		// Animation (Change to this.sprite.setScale if needed)
		const squish = 1.0 + 0.02 * Math.sin((6 * time) / 1000);
		this.setScale(1.0, squish);
	}

	setCaptain(newCaptain: TileEntity | null) {
		if (this.captain && !newCaptain) {
			this.captain.setVisible(true);
		}
		if (newCaptain) {
			newCaptain.setVisible(false);
		}
		this.captain = newCaptain;

		this.sprite.setFrame(this.captain ? 1 : 0);
	}
}
