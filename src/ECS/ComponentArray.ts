import { EntityId } from './ECSTypes';
import { Component, IComponent } from './ComponentManager';

export class ComponentArray<T extends Component<IComponent>> {
  private readonly componentData: Array<T> = [];
  private readonly entityToIndex: Map<EntityId, number> = new Map();
  private readonly indexToEntity: Map<number, EntityId> = new Map();

  get size() {
    return this.componentData.length;
  }

  insert(entity: EntityId, data: T) {
    if (this.entityToIndex.has(entity))
      throw new TypeError(
        `Entity ${entity} already exists with component ${data.constructor.name}`,
      );

    this.entityToIndex.set(entity, this.size);
    this.indexToEntity.set(this.size, entity);
    this.componentData.push(data);
  }

  remove(entity: EntityId) {
    if (!this.entityToIndex.has(entity))
      throw new TypeError(`Component does not exist for Entity ${entity}`);

    const indexToReplace = this.entityToIndex.get(entity)!;
    const lastElementIndex = this.size - 1;
    const removedComponent = this.componentData[indexToReplace];

    this.componentData[indexToReplace] = this.componentData[lastElementIndex];

    const entityToSwap = this.indexToEntity.get(lastElementIndex)!;

    this.entityToIndex.set(entityToSwap, indexToReplace);
    this.indexToEntity.set(indexToReplace, entityToSwap);

    this.entityToIndex.delete(entity);
    this.indexToEntity.delete(lastElementIndex);
    this.componentData.pop();

    return removedComponent;
  }

  get(entity: EntityId) {
    if (!this.entityToIndex.has(entity))
      throw new TypeError(`Entity ${entity} does not exist with component`);

    const retrievalIndex = this.entityToIndex.get(entity)!;

    if (typeof this.componentData[retrievalIndex] === 'undefined')
      throw new RangeError(`Internal ECS Engine Error: Entity Data retrieval failed.`);

    return this.componentData[retrievalIndex]!;
  }

  has(entity: EntityId) {
    return this.entityToIndex.has(entity);
  }
}
