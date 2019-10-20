import { System } from '../../ECS/SystemManager';
import { Input } from '../components/Input';
import { Transform } from '../components/Transform';
import { EntityId } from '../../ECS/ECSTypes';
import { PhysicsProperties } from '../components/PhysicsProperties';
import { InputHandler, InputType } from '../../util/InputHandler';
import { Vector2D } from '../../util/Vector2D';

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export class PlayerController extends System {
  static components = [Input, Transform, PhysicsProperties];

  initializedEntities: Set<EntityId> = new Set();
  inputHandler: InputHandler = new InputHandler();

  private initializeController(entity: EntityId) {
    const input = this.parent.getComponent(entity, Input);

    const upKeys = input.up || [];
    const downKeys = input.down || [];
    const leftKeys = input.left || [];
    const rightKeys = input.right || [];
    const actionKeys = input.action || [];

    upKeys.forEach((key: string) =>
      this.inputHandler.on(key, InputType.HOLD, this.movePlayer(entity, Vector2D.up())),
    );
    downKeys.forEach((key: string) =>
      this.inputHandler.on(key, InputType.HOLD, this.movePlayer(entity, Vector2D.down())),
    );
    leftKeys.forEach((key: string) =>
      this.inputHandler.on(key, InputType.HOLD, this.movePlayer(entity, Vector2D.left())),
    );
    rightKeys.forEach((key: string) =>
      this.inputHandler.on(key, InputType.HOLD, this.movePlayer(entity, Vector2D.right())),
    );
    actionKeys.forEach((key: string) =>
      this.inputHandler.on(key, InputType.PRESS, this.doAction(entity)),
    );
  }

  private movePlayer(entity: EntityId, direction: Vector2D) {
    const physicsProperties = this.parent.getComponent(entity, PhysicsProperties);

    return () => {
      physicsProperties.force.add(direction);
    };
  }

  private doAction(entity: EntityId) {
    return () => {
      console.log(`Doing action`);
    };
  }

  initialize() {
    for (const entity of this.entities) {
      if (!this.initializedEntities.has(entity) && this.parent.hasComponent(entity, Input)) {
        this.initializeController(entity);
        this.initializedEntities.add(entity);
      }
    }
  }

  run(deltaTime: number) {
    this.inputHandler.update();
  }
}
