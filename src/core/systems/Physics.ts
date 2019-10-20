import { System } from '../../ECS/SystemManager';
import { PhysicsProperties } from '../components/PhysicsProperties';
import { Transform } from '../components/Transform';
import { Bounds } from '../components/Bounds';
import { clamp } from '../../util/Math/MathD';
import { WorldManager } from './WorldManager';

export class Physics extends System {
  static components = [PhysicsProperties, Transform];

  run(deltaTime: number): void {
    for (const entity of this.entities) {
      const physicsProperties = this.parent.getComponent(entity, PhysicsProperties);
      const transform = this.parent.getComponent(entity, Transform);
      const velocity = physicsProperties.force
        .scale(1 / physicsProperties.mass)
        .clamp(-physicsProperties.maxSpeed, physicsProperties.maxSpeed)
        .trim()
        .clone();

      const nextPosition = transform.position
        .clone()
        .add(velocity.scale(physicsProperties.speed * deltaTime))
        .round();

      if (this.parent.getSystem(WorldManager).getWorldBoundaries()) {
        const bounds = this.parent.getSystem(WorldManager).getWorldBoundaries()!;

        nextPosition.x = clamp(nextPosition.x, bounds.minX, bounds.maxX);
        nextPosition.y = clamp(nextPosition.y, bounds.minY, bounds.maxY);
      }

      transform.position = nextPosition;
    }
  }
}
