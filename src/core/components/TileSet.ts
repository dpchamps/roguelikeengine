import { Component } from '../../ECS/ComponentManager';

interface ITileSet {
  name?: string;
  imagePath?: string;
  square?: number;
  offset?: number;
}

export class TileSet extends Component<ITileSet> {
  name = '';
  imagePath = '';
  square = 0;
  offset = 0;
  rows = 0;
  cols = 0;

  init(o: ITileSet = {}) {
    this.name = o.name || Math.random().toString();
    this.imagePath = o.imagePath || '';
    this.square = o.square || 0;
    this.offset = o.offset || 0;
  }
}
