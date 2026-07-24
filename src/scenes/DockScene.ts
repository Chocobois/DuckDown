import Phaser, { WEBGL } from "phaser";

import { BaseScene } from "./BaseScene";
import { OutlineFilter } from "@/filters/Outline";
import ShopButton from "@/components/buttons/ShopButton";

export class DockScene extends BaseScene {

    public background: Phaser.GameObjects.Image;
    public shop: ShopButton;

	constructor() {
		super({ key: "DockScene" });
	}

    create() {
        this.background = this.add.image(this.CX, this.CY, "dock_background");

        this.shop = new ShopButton(this, 360, 180, 0.7);
    }
}