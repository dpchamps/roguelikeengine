import { Component } from '../../ECS/ComponentManager';

export enum RenderableType {
  TILE = 'tile',
  COMPOSITE = 'composite',
  GRAPHIC = 'graphic',
}

interface IRenderable {
  type: RenderableType;
  assetName: string;
  isVisible: boolean;
}

export class Renderable extends Component<IRenderable> {
  type: RenderableType = RenderableType.GRAPHIC;
  assetName: string = '';
  isVisible = true;

  init(o: IRenderable) {
    this.type = o.type;
    this.assetName = o.assetName;
    this.isVisible = typeof o.isVisible === 'undefined' ? true : o.isVisible;
  }
}
