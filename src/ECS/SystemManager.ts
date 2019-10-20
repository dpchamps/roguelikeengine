import { EntityId } from './ECSTypes';
import { Signature } from '../core/Signature';
import { ECS } from './ECS';

export abstract class System {
  entities: Set<EntityId> = new Set();
  frequency: number = 1;
  exclusive: boolean = true;

  protected parent: ECS;

  constructor(parent: ECS) {
    this.parent = parent;
  }

  initialize(entity: EntityId) {}
  update(entity: EntityId) {}
  runLate(deltaTime: number) {}
  run(deltaTime: number) {}
}

export class SystemManager {
  systems: Map<string, System> = new Map();
  signatures: Map<string, Signature> = new Map();

  register<T extends System>(system: new (ecs: ECS) => T, ecs: ECS) {
    const systemInstance = new system(ecs);

    if (this.systems.has(system.name))
      throw new TypeError(`System ${system.name} has already been registered.`);

    this.systems.set(system.name, systemInstance);
    this.setSignature(system, new Signature());
  }

  setSignature<T extends System>(system: new (ecs: ECS) => T, signature: Signature) {
    if (!this.systems.has(system.name))
      throw new TypeError(`System ${system.name} hasn't been registered.`);

    this.signatures.set(system.name, signature);
  }

  destroy(entity: EntityId) {
    for (const entry of this.systems) {
      entry[1].entities.delete(entity);
    }
  }

  updateEntitySignature(entity: EntityId, signature: Signature) {
    for (const entry of this.systems) {
      const name = entry[0];
      const system = entry[1];
      const systemSignature = this.signatures.get(name);

      if (!systemSignature) continue;

      const match = system.exclusive
        ? signature.is(systemSignature)
        : signature.has(systemSignature);

      if (match) {
        system.entities.add(entity);
      } else {
        system.entities.delete(entity);
      }

      system.update(entity);
    }
  }

  initialize(entity: EntityId) {
    for (const entry of this.systems) {
      const name = entry[0];
      const system = entry[1];

      if (system.entities.has(entity)) {
        system.initialize(entity);
      }
    }
  }

  run(deltaTime: number) {
    for (const entry of this.systems) {
      const system = entry[1];

      system.run(deltaTime);
    }
  }

  runLate(deltaTime: number) {
    for (const entry of this.systems) {
      const system = entry[1];

      system.runLate(deltaTime);
    }
  }
}
