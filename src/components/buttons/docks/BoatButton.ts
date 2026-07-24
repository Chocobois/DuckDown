import Phaser from 'phaser';
import { Button } from '../Button';
import { BaseScene } from '@/scenes/BaseScene';
import { OutlineFilter } from '@/filters/Outline';

export default class BoatButton extends Button {
  private sprite: Phaser.GameObjects.Sprite;
  private spriteOutline: OutlineFilter;

  constructor(scene: BaseScene, x: number, y: number, scale: number) {
    super(scene, x, y);

    this.sprite = this.scene.add.sprite(x, y, 'dock_boat');
    this.sprite.enableFilters();
    this.sprite.setOrigin(0.5, 1);
    this.sprite.setScale(scale * 0.98);

    this.spriteOutline = new OutlineFilter(
      this.sprite.filterCamera,
      8,
      0xffffff,
    );
    this.sprite.filters!.internal.add(this.spriteOutline);
    this.spriteOutline.active = false;

    this.bindInteractive(this.sprite);

    this.scene.tweens.add({
      targets: this.sprite,
      scaleY: scale,
      duration: 450,
      ease: 'Cubic.Out',
      yoyo: true,
      repeat: -1,
      delay: x * 1.1,
    });

    this.sprite.on('pointerover', () => {
      this.spriteOutline.active = true;
    });

    this.sprite.on('pointerout', () => {
      this.spriteOutline.active = false;
    });
  }
}
