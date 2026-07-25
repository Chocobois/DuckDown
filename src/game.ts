import Phaser from 'phaser';
import { PreloadScene } from '@/scenes/PreloadScene';
import { TitleScene } from '@/scenes/TitleScene';
import { GameScene } from '@/scenes/GameScene';
import { DockScene } from '@/scenes/DockScene';
import { ScoreScene } from './scenes/ScoreScene';

export async function Game() {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
    mipmapFilter: 'LINEAR_MIPMAP_LINEAR',
    roundPixels: false,
    scale: {
      mode: Phaser.Scale.FIT,
    },
    scene: [PreloadScene, TitleScene, GameScene, DockScene, ScoreScene],

    plugins: {
      global: [],
    },
  };

  const game = new Phaser.Game(config);
}
