import { Component } from '../../ECS/ComponentManager';

interface ITile {
  name: string;
  tileSet: string;
  tileX: number;
  tileY: number;
}

export class Tile extends Component<ITile> {
  name = '';
  tileSet = '';
  tileX = 0;
  tileY = 0;

  init(o: ITile) {
    this.name = o.name;
    this.tileSet = o.tileSet;
    this.tileX = o.tileX;
    this.tileY = o.tileY;
  }
}
