import { application } from './renderer/application';
import { preGameResources } from './renderer/resources';
import { ecs } from './meta/ecs';
import { KeyCode } from './util/KeyCode';

document.body.appendChild(application.renderer.view);
document.body.addEventListener('keydown', e => e.preventDefault());

(async () => {
  await preGameResources();

  ecs.registerAssembly({
    name: 'world',
    immediate: true,
    components: [
      {
        name: 'World',
      },
      {
        name: 'Bounds',
        init: {
          minX: 0,
          maxX: 500,
          minY: 0,
          maxY: 1000,
        },
      },
    ],
  });

  ecs.registerAssembly({
    name: 'characterTileset',
    immediate: true,
    components: [
      {
        name: 'TileSet',
        init: {
          name: 'characterTileset',
          imagePath: 'static/assets/characters.png',
          square: 16,
          offset: 1,
        },
      },
    ],
  });

  ecs.registerAssembly({
    name: 'worldTileset',
    immediate: true,
    components: [
      {
        name: 'TileSet',
        init: {
          name: 'worldTileset',
          imagePath: 'static/assets/tileset.png',
          square: 16,
          offset: 1,
        },
      },
    ],
  });

  ecs.registerAssembly({
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
  });

  ecs.registerAssembly({
    name: 'BaseTileMap',
    immediate: true,
    components: [
      {
        name: 'Transform',
      },
      {
        name: 'Grid',
      },
      {
        name: 'TileMap',
        init: {
          tileSet: 'worldTileset',
          tiles: [
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
            [
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
              [3, 16],
            ],
          ],
        },
      },
    ],
  });

  ecs.registerAssembly({
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
  });

  const beekeeper = ecs.spawn('beekeeper');
  console.log(ecs);
  console.log(beekeeper);

  application.ticker.add(delta => {
    ecs.runSystems(delta);
    ecs.runSystemsLate(delta);
  });
})();
