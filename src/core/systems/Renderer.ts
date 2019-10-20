import { System } from '../../ECS/SystemManager';
import { EntityId } from '../../ECS/ECSTypes';
import { DisplayObject, Sprite } from 'pixi.js';
import { Renderable, RenderableType } from '../components/Renderable';
import { application } from '../../renderer/application';
import { AssetLoader } from './AssetLoader';
import { Transform } from '../components/Transform';

export class Renderer extends System {
  static components = [Renderable, Transform];

  renderedElements: Map<EntityId, DisplayObject> = new Map();
  isDirty = true;

  private getAsset(renderable: Renderable) {
    const assetLoader = this.parent.getSystem(AssetLoader);
    switch (renderable.type) {
      case RenderableType.TILE:
        return new Sprite(assetLoader.getTileTexture(renderable.assetName));
      case RenderableType.GRAPHIC:
      case RenderableType.COMPOSITE:
        // TODO: Implement these
        throw new Error(`Renderable type ${renderable.type} not implemented yet.`);
    }
  }

  run(deltaTime: number) {
    for (const entity of this.entities) {
      const transform = this.parent.getComponent(entity, Transform);
      const renderable = this.parent.getComponent(entity, Renderable);

      if (this.isDirty && !this.renderedElements.has(entity)) {
        console.log(renderable);
        const asset = this.getAsset(renderable);

        application.stage.addChild(asset);
        this.renderedElements.set(entity, asset);
      }

      const element = this.renderedElements.get(entity);
      if (element) {
        element.x = transform.position.x;
        element.y = transform.position.y;
        element.visible = renderable.isVisible;
      }
    }
    this.isDirty = false;
  }

  update(entity: number) {
    this.isDirty = true;

    const displayObject = this.renderedElements.get(entity);
    if (displayObject) {
      application.stage.removeChild(displayObject);
      this.renderedElements.delete(entity);
    }
  }
}
