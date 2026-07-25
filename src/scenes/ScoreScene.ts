import Phaser from 'phaser';

import { BaseScene } from './BaseScene';

export class ScoreScene extends BaseScene {
  public background: Phaser.GameObjects.Image;

  constructor() {
    super({ key: 'ScoreScene' });
  }

  create() {
    this.background = this.add.image(this.CX, this.CY, 'score_background');
  }
}
