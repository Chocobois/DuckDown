import Phaser from "phaser";
import { BaseScene } from "@/scenes/BaseScene";
import { TileEntity } from "./TileEntity";

export class Down extends TileEntity {
	private sprite: Phaser.GameObjects.Sprite;

	constructor(scene: BaseScene) {
		super(scene, "Down");

		this.sprite = this.scene.add.sprite(0, 0, "tileset_overworld", 5);
		this.sprite.setScale(128 / this.sprite.width);
		this.add(this.sprite);
	}
}
