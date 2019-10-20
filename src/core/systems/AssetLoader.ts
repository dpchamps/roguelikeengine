import { System } from '../../ECS/SystemManager';
import { TileSet } from '../components/TileSet';
import { MIPMAP_MODES, SCALE_MODES, Rectangle, Texture, utils } from 'pixi.js';
import { EntityId } from '../../ECS/ECSTypes';
import { Tile } from '../components/Tile';

export interface ITilesetAsset {
  rows: number;
  cols: number;
  tiles: Array<Texture>;
  square: number;
}

export class AssetLoader extends System {
  static components = [TileSet, Tile];
  exclusive = false;

  isDirty = false;
  loadedAssets: Set<EntityId> = new Set();
  tileSets: Map<string, ITilesetAsset> = new Map();
  tiles: Map<string, Texture> = new Map();

  private loadTileSet(entity: EntityId) {
    const tilesetArray: Array<Texture> = [];
    const tileset = this.parent.getComponent(entity, TileSet);
    const texture = this.getApplicationTexture(tileset.imagePath);

    texture.baseTexture.mipmap = MIPMAP_MODES.POW2;
    texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

    if (!texture) return; //TODO: Error?

    const cols = Math.round(texture.width / (tileset.square + tileset.offset));
    const rows = Math.round(texture.height / (tileset.square + tileset.offset));

    for (let x = 0; x < cols; x += 1) {
      for (let y = 0; y < rows; y += 1) {
        const tileTexture = texture.clone();

        tileTexture.frame = new Rectangle(
          x * (tileset.square + tileset.offset),
          y * (tileset.square + tileset.offset),
          tileset.square,
          tileset.square,
        );

        tilesetArray.push(tileTexture);
      }
    }

    this.tileSets.set(tileset.name, {
      rows,
      cols,
      tiles: tilesetArray,
      square: tileset.square,
    });
  }

  private loadTile(entity: EntityId) {
    const tile = this.parent.getComponent(entity, Tile);
    const tileset = this.tileSets.get(tile.tileSet);
    if (!tileset) {
      throw new TypeError(
        `Attempting to load a tile from a tileset that doesn't exist. Load order matters here`,
      );
    }
    const tileIdx = tile.tileX * tileset.rows + tile.tileY;

    this.tiles.set(tile.name, tileset.tiles[tileIdx]);
  }

  getTileTexture(tileName: string) {
    if (!this.tiles.has(tileName)) {
      throw new TypeError(`Cannot find tile ${tileName}`);
    }

    return this.tiles.get(tileName)!;
  }

  getApplicationTexture(imagePath: string) {
    return utils.TextureCache[imagePath] as Texture;
  }

  initialize(entity: number) {
    this.run(-1);
  }

  run(deltaTime: number): void {
    if (this.isDirty) {
      for (const entity of this.entities) {
        if (this.loadedAssets.has(entity)) continue;
        if (this.parent.hasComponent(entity, TileSet)) this.loadTileSet(entity);
        if (this.parent.hasComponent(entity, Tile)) this.loadTile(entity);

        this.loadedAssets.add(entity);
      }
      this.isDirty = false;
    }
  }

  update(entity: number) {
    this.loadedAssets.delete(entity);
    this.isDirty = true;
  }
}
