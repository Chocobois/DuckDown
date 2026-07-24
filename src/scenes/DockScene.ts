import Phaser, { WEBGL } from 'phaser';

import { BaseScene } from './BaseScene';
import ShopButton from '@/components/buttons/docks/ShopButton';
import PlayerButton from '@/components/buttons/docks/PlayerButton';
import BoatButton from '@/components/buttons/docks/BoatButton';

export class DockScene extends BaseScene {
  public background: Phaser.GameObjects.Image;
  public shop: ShopButton;
  public player: PlayerButton;
  public boat: BoatButton;

  constructor() {
    super({ key: 'DockScene' });
  }

  create() {
    this.background = this.add.image(this.CX, this.CY, 'dock_background');

    this.shop = new ShopButton(this, 360, 350, 0.7);
    this.player = new PlayerButton(this, 530, 580, 0.5);
    this.boat = new BoatButton(this, 1100, 900, 1);

    this.boat.on('click', () => {
      console.log('Clicked');
      this.scene.start('GameScene');
    });
  }
}
