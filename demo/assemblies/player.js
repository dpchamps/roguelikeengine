import { KeyCode } from '../../src/util/KeyCode';

export default [
  {
    name: 'beekeeperSprite',
    immediate: true,
    components: [
      {
        name: 'Tile',
        init: {
          name: 'beekeeperSprite',
          tileSet: 'characterTileset',
          tileX: 0,
          tileY: 9,
        },
      },
    ],
  },

  {
    name: 'beekeeper',
    components: [
      {
        name: 'Transform',
        init: {},
      },
      {
        name: 'Renderable',
        init: {
          type: 'tile',
          assetName: 'beekeeperSprite',
        },
      },
      {
        name: 'Input',
        init: {
          up: ['w'],
          down: ['s'],
          left: ['a'],
          right: ['d'],
          action: [KeyCode.Enter],
          menu: [KeyCode.Backspace]
        },
      },
      {
        name: 'PhysicsProperties',
        init: {
          speed: 1.7,
          maxSpeed: 1,
          mass: 1.6,
        },
      },
      {
        name: 'Follow',
      },
    ],
  }
];
