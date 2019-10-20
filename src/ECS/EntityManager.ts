import { EntityId, MAX_ENTITIES } from './ECSTypes';
import { Signature } from '../core/Signature';

type ComponentSignature = Signature;

export class EntityManager {
  private readonly availableEntities: Array<EntityId> = [];
  private readonly componentSignatures: Array<ComponentSignature> = [];

  issuedEntities: Set<EntityId> = new Set();

  constructor() {
    for (let i = 0; i < MAX_ENTITIES; i += 1) {
      this.availableEntities.push(i);
      this.componentSignatures.push(new Signature());
    }
  }

  create() {
    if (this.availableEntities.length === 0) throw new Error(`Maximum Entity Limit reached.`);

    const id = this.availableEntities.shift()!;

    this.issuedEntities.add(id);

    return id;
  }

  destroy(entity: EntityId) {
    if (entity > MAX_ENTITIES || entity < 0)
      throw new RangeError(`Entity ${entity} can not exist.`);
    if (!this.issuedEntities.has(entity))
      throw new TypeError(`Entity ${entity} is not currently active`);

    this.availableEntities.push(entity);
    this.componentSignatures[entity].reset();
    this.issuedEntities.delete(entity);
  }

  assignSignature(entity: EntityId, signature: Signature) {
    if (entity > MAX_ENTITIES || entity < 0)
      throw new RangeError(`Entity ${entity} is out of range ( 0 - ${MAX_ENTITIES}`);

    this.componentSignatures[entity] = signature;
  }

  getSignature(entity: EntityId) {
    if (entity > MAX_ENTITIES || entity < 0)
      throw new RangeError(`Entity ${entity} is out of range ( 0 - ${MAX_ENTITIES}`);

    return this.componentSignatures[entity];
  }
}
