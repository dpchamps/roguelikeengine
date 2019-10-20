import { System } from '../../ECS/SystemManager';
import { application } from '../../renderer/application';
import { Follow } from '../components/Follow';
import { Transform } from '../components/Transform';
import { clamp, lerp } from '../../util/Math/MathD';
import { WorldManager } from './WorldManager';

export class Viewport extends System {
  static components = [Follow];
  exclusive = false;
  followEntity: number | null = null;

  update(entity: number) {
    if (!this.entities.has(entity)) return;

    if (this.parent.hasComponent(entity, Follow)) {
      const newFollow = this.parent.getComponent(entity, Follow);

      if (newFollow.active) {
        for (const other of this.entities) {
          if (this.parent.hasComponent(other, Follow))
            this.parent.getComponent(other, Follow).active = false;
        }
        this.followEntity = entity;
      }
    }
  }

  run(deltaTime: number) {
    const vpWidth = application.screen.width;
    const vpHeight = application.screen.height;
    const worldBounds = this.parent.getSystem(WorldManager).getWorldBoundaries();

    if (this.followEntity) {
      const transform = this.parent.getComponent(this.followEntity, Transform);
      const scrollX = vpWidth / 2 - transform.position.x;
      const scrollY = vpHeight / 2 - transform.position.y;
      const nextX = clamp(scrollX, -worldBounds.maxX, -worldBounds.minX);
      const nextY = clamp(scrollY, -worldBounds.maxY, -worldBounds.minY);

      application.stage.x = lerp(application.stage.x, nextX, deltaTime * 5) | 0;
      application.stage.y = lerp(application.stage.y, nextY, deltaTime * 5) | 0;
    }
  }
}
