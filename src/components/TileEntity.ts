import Phaser from "phaser";
import { BaseScene } from "@/scenes/BaseScene";

// An item that has a tile grid position
export class TileEntity extends Phaser.GameObjects.Container {
	public scene: BaseScene;
	public tileX: number;
	public tileY: number;

	constructor(scene: BaseScene) {
		super(scene, 0, 0);
		scene.add.existing(this);
		this.scene = scene;
	}
}
