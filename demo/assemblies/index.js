import map from './map.js';
import player from './player';
import tilesets from './tilesets.js';
import world from './world.js';

export default [
  ...tilesets,
  map,
  world,
  ...player,
]
