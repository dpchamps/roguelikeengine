import { Component } from '../../ECS/ComponentManager';

interface IBounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export class Bounds extends Component<IBounds> {
  minX = 0;
  maxX = 0;
  minY = 0;
  maxY = 0;

  init(o: Partial<IBounds>) {
    Object.entries(o).forEach(([k, v]) => (this[k] = Number(v)));
  }
}
