import { Component } from '../../ECS/ComponentManager';

type TileArray = Array<Array<number | [number, number]>>;

interface ITileMap {
  tileSet: string;
  tiles: TileArray;
}

export class TileMap extends Component<ITileMap> {
  tileSet = '';
  tiles: TileArray = [];
  height: number = 0;
  width: number = 0;

  init(o: Partial<ITileMap>) {
    this.tileSet = o.tileSet || '';

    const tileArray = o.tiles || [];

    this.height = tileArray.length;

    for (let y = 0; y < tileArray.length; y += 1) {
      if (typeof tileArray[y] === 'undefined') {
        tileArray[y] = Array(this.x).fill(-1);
      }

      if (tileArray[y].length < this.x) {
        const slotsToFill = this.x - tileArray[y].length;
        tileArray[y].splice(tileArray[y].length, 0, ...Array(slotsToFill).fill(-1));
      }

      this.width = Math.max(this.width, tileArray[y].length);
    }

    this.tiles = tileArray;
  }
}
