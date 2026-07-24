import Phaser from 'phaser';
import { Button } from './Button';
import { BaseScene } from '@/scenes/BaseScene';
import { OutlineFilter } from '@/filters/Outline';

export default class ShopButton extends Button {
    private shopSprite: Phaser.GameObjects.Sprite;
    private shopSpriteOutline: OutlineFilter;

    constructor(scene: BaseScene, x: number, y: number, scale: number) {
        super(scene, x, y);

        this.shopSprite = this.scene.add.sprite(360, 180, "overworld_shop");
        this.shopSprite.enableFilters();
        this.shopSprite.setScale(scale);

        this.shopSpriteOutline = new OutlineFilter(this.shopSprite.filterCamera, 8, 0xFFFFFF);
        this.shopSprite.filters!.internal.add(this.shopSpriteOutline)
        this.shopSpriteOutline.active = false;
        
        this.bindInteractive(this.shopSprite);

        this.shopSprite.on('pointerover', () => {
            this.shopSpriteOutline.active = true;
        });

        this.shopSprite.on('pointerout', () => {
            this.shopSpriteOutline.active = false;
        });
    }
}