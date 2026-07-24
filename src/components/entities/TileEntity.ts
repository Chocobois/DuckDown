import Phaser from "phaser";
import { BaseScene } from "@/scenes/BaseScene";

// An item that has a tile grid position
export class TileEntity extends Phaser.GameObjects.Container {
	public scene: BaseScene;
	public tileX: number = 0;
	public tileY: number = 0;

	constructor(scene: BaseScene) {
		super(scene, 0, 0);
		scene.add.existing(this);
		this.scene = scene;
	}

	update(time: number, delta: number) {
		// Animation (Change to this.sprite.setScale if needed)
		const squish = 1.0 + 0.04 * Math.sin((6 * time) / 1000);
		this.setScale(1.0, squish);
	}
}
