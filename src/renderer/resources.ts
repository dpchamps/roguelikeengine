import { Loader } from 'pixi.js';

export const preGameResources: () => Promise<void> = () =>
  new Promise(res => {
    Loader.shared
      .add('static/assets/tileset.png')
      .add('static/assets/characters.png')
      .load(res);
  });
