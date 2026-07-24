import Phaser from "phaser";
import { GameScene } from "@/scenes/GameScene";
import { EntityType } from "./entities/TileEntity";
import { Tile } from "./TileManager";

export interface Slot {
	type: EntityType;
	image: Phaser.GameObjects.Image;
	text: Phaser.GameObjects.Text;
	count: number;
}

export class UI extends Phaser.GameObjects.Container {
	public scene: GameScene;
	public inventory: Slot[];

	private text: Phaser.GameObjects.Text;

	constructor(scene: GameScene) {
		super(scene, 0, 0);
		scene.add.existing(this);
		this.scene = scene;
		this.setScrollFactor(0);

		this.add(scene.add.rectangle(0, 0, 240, 180, 0x000000, 0.5).setOrigin(0));

		this.inventory = [];
		const types: EntityType[] = ["Down", "Eggs"];

		types.forEach((type, index) => {
			const image = scene.add.image(
				50,
				50 + 80 * index,
				"tileset_overworld",
				Tile.indexOf(type as Tile), // Bad hack, need to move sprites
			);
			image.setDisplaySize(100, 100);
			this.add(image);

			const text = this.scene.addText({
				x: 50 + 64,
				y: 50 + 80 * index,
				size: 48,
				color: "white",
				text: "0",
			});
			text.setOrigin(0, 0.5);
			this.add(text);

			const count = 0;

			this.inventory.push({
				type,
				image,
				text,
				count,
			});
		});
	}

	update(time: number, delta: number) {}

	getItemSlot(type: EntityType): Slot | undefined {
		return this.inventory.find((slot) => type == slot.type);
	}

	canCollect(type: EntityType): boolean {
		return !!this.getItemSlot(type);
	}

	addItem(type: EntityType) {
		const slot = this.getItemSlot(type);
		if (slot) {
			slot.count += 1;
			slot.text.setText(slot.count.toString());
		}
	}
}
