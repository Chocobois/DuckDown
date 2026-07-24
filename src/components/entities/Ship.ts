import Phaser from "phaser";
import { BaseScene } from "@/scenes/BaseScene";
import { TileEntity } from "./TileEntity";

export class Ship extends TileEntity {
	public captain: TileEntity | null = null;

	private sprite: Phaser.GameObjects.Sprite;

	constructor(scene: BaseScene) {
		super(scene, "Ship");

		this.sprite = this.scene.add.sprite(0, 0, "ship");
		this.sprite.setScale(128 / this.sprite.width);
		this.add(this.sprite);
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
