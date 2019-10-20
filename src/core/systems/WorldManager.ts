import { System } from '../../ECS/SystemManager';
import { World } from '../components/World';
import { Bounds } from '../components/Bounds';
import { EntityId } from '../../ECS/ECSTypes';

export class WorldManager extends System {
  static components = [World];
  worldEntity: EntityId = -1;

  initialize(entity: number) {
    super.initialize(entity);
  }

  getWorldBoundaries() {
    if (this.parent.hasComponent(this.worldEntity, Bounds)) {
      return this.parent.getComponent(this.worldEntity, Bounds);
    }

    return {
      minX: 0,
      maxX: Infinity,
      minY: 0,
      maxY: Infinity,
    };
  }

  update(entity: number) {
    if (this.entities.size > 1) {
      //TODO: I have no idea what to do here, indicative that maybe this is not
      //  the correct way to handle the world.
    }
    this.worldEntity = this.entities.has(entity) ? entity : this.worldEntity;
  }

  run(deltaTime: number): void {}
}
