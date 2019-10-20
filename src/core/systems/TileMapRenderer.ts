import { System } from '../../ECS/SystemManager';
import { Renderable } from '../components/Renderable';
import { Grid } from '../components/Grid';
import { TileMap } from '../components/TileMap';
import { EntityId } from '../../ECS/ECSTypes';
import { DisplayObject, Sprite, Container } from 'pixi.js';
import { AssetLoader, ITilesetAsset } from './AssetLoader';
import { Transform } from '../components/Transform';
import { application } from '../../renderer/application';

export class TileMapRenderer extends System {
  static components = [Grid, TileMap, Transform];

  renderedTileMaps: Map<EntityId, DisplayObject> = new Map();

  private getTileSetAsset(name: string) {
    const assetLoader = this.parent.getSystem(AssetLoader);
    const tileSet = assetLoader.tileSets.get(name);

    if (!tileSet)
      throw new TypeError(`TileSet ${name} couldn't be found or hasn't been loaded yet.`);

    return tileSet;
  }

  private getTileIdx(t: number | [number, number], tileSet: ITilesetAsset) {
    if (typeof t === 'number') return t;

    return t[0] * tileSet.rows + t[1];
  }

  private drawTileSet(entity: EntityId) {
    const container = new Container();
    const tileMap = this.parent.getComponent(entity, TileMap);
    const tileSet = this.getTileSetAsset(tileMap.tileSet);
    const transform = this.parent.getComponent(entity, Transform);
    const grid = this.parent.getComponent(entity, Grid);

    for (let y = 0; y < tileMap.height; y += 1) {
      for (let x = 0; x < tileMap.width; x += 1) {
        const tileIndex = this.getTileIdx(tileMap.tiles[y][x], tileSet);
        const tileSprite = new Sprite(tileSet.tiles[tileIndex]);

        tileSprite.width *= grid.resolution;
        tileSprite.height *= grid.resolution;

        tileSprite.x = transform.position.x + x * (tileSet.square + grid.spacing);
        tileSprite.y = transform.position.y + y * (tileSet.square + grid.spacing);

        container.addChild(tileSprite);
      }
    }

    return container;
  }

  initialize(entity: EntityId) {
    const renderedTileMap = this.drawTileSet(entity);
    this.renderedTileMaps.set(entity, renderedTileMap);

    application.stage.addChild(renderedTileMap);
  }

  update(entity: EntityId) {
    super.update(entity);
  }

  run(deltaTime: number): void {}
}
