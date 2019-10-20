import { Vector2D } from '../../util/Vector2D';
import { Component } from '../../ECS/ComponentManager';

interface ITransform {
  position: Vector2D;
  rotation: Vector2D;
  scale: Vector2D;
}

export class Transform extends Component<ITransform> {
  position: Vector2D = Vector2D.zero();
  rotation: Vector2D = Vector2D.zero();
  scale: Vector2D = Vector2D.zero();

  init(o: Partial<ITransform> = {}) {
    Object.entries(o).forEach(entry => {
      const key = entry[0];
      const value = entry[1];

      this[key] = value instanceof Vector2D ? value : Vector2D.deserialize(value || [0, 0]);
    });
  }
}
