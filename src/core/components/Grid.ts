import { Component } from '../../ECS/ComponentManager';

interface IGrid {
  resolution: number;
  spacing: number;
}

export class Grid extends Component<IGrid> {
  resolution = 1;
  spacing = 0;
}
