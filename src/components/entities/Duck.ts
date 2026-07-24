import Phaser from "phaser";
import { BaseScene } from "@/scenes/BaseScene";
import { TileEntity } from "./TileEntity";

export class Duck extends TileEntity {
	private sprite: Phaser.GameObjects.Sprite;

	constructor(scene: BaseScene) {
		super(scene, "Duck");

		this.sprite = this.scene.add.sprite(0, 0, "tileset_overworld", 6);
		this.sprite.setScale(128 / this.sprite.width);
		this.add(this.sprite);
	}
}
