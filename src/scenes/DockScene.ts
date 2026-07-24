import Phaser from "phaser";

import { BaseScene } from "./BaseScene";

export class DockScene extends BaseScene {

    public background: Phaser.GameObjects.Image;
    public shop: Phaser.GameObjects.Image;

	constructor() {
		super({ key: "DockScene" });
	}

    create() {
        this.background = this.add.image(this.CX, this.CY, "dock_background");

        this.shop = this.add.image(360, 160, "overworld_shop");
        this.shop.setScale(0.7);
    }
}