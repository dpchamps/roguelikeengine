import { MemoryPool } from '../core/MemoryPool';
import { EntityId } from './ECSTypes';
import { Signature } from '../core/Signature';
import { ComponentArray } from './ComponentArray';

type ComponentConstructor<T> = new () => Component<T>;
export interface IComponent {
  [index: string]: any;
}

export abstract class Component<T extends IComponent> {
  [index: string]: any;

  init(o: T | {} = {}) {
    //TODO: minor|easy: optimize this, we'll be wanting to prepare for rapid component initializations.
    Object.entries(o).forEach(([k, v]) => (this[k] = v));
  }
}

export type ECSComponent = Component<IComponent>;
export type ComponentSignature = (new () => Component<IComponent>) | string;

export class ComponentManager {
  private readonly componentRegistry: Map<string, new () => Component<IComponent>> = new Map();
  private readonly signatureRegistry: Map<string, Signature> = new Map();
  private readonly pools: Map<string, MemoryPool<Component<IComponent>>> = new Map();
  private readonly componentArrays: Map<string, ComponentArray<Component<IComponent>>> = new Map();

  private readonly issuedComponents: Set<Component<IComponent>> = new Set();
  private componentCount: bigint = BigInt(0);

  private getNextId() {
    const nextId = BigInt(1) << this.componentCount;

    this.componentCount += BigInt(1);

    return nextId;
  }

  private extractNameFromParameter(component: ComponentSignature) {
    return typeof component === 'string' ? component : component.name;
  }

  getComponentType<T extends ECSComponent>(name: string) {
    if (!this.componentRegistry.has(name)) throw new TypeError(`Component ${name} doesn't exist.`);

    return this.componentRegistry.get(name)!;
  }

  getComponentSignature<T extends ECSComponent>(component: new () => T) {
    if (!this.signatureRegistry.has(component.name)) {
      throw new TypeError(`Component ${component.name} doesn't exist.`);
    }

    return this.signatureRegistry.get(component.name)!;
  }

  getComponentId(name: string) {
    if (!this.signatureRegistry.has(name)) {
      throw new TypeError(`Component ${name} doesn't exist.`);
    }

    return this.signatureRegistry.get(name)!.signature;
  }

  getComponentPool(name: string) {
    if (!this.pools.has(name)) {
      throw new TypeError(`Component ${name} doesn't exist`);
    }

    return this.pools.get(name)!;
  }

  getComponentArray(name: string) {
    if (!this.componentArrays.has(name)) throw new TypeError(`Component ${name} doesn't exist`);

    return this.componentArrays.get(name)!;
  }

  register<T>(component: ComponentConstructor<T>) {
    const id = new Signature(this.getNextId());
    const name = component.name;
    const array = new ComponentArray<Component<T>>();
    const pool = new MemoryPool(() => new component());

    this.componentRegistry.set(name, component);
    this.signatureRegistry.set(name, id);
    this.componentArrays.set(name, array);
    this.pools.set(name, pool);
  }

  add<T extends Component<IComponent>, K>(
    entity: EntityId,
    component: (new () => Component<T>) | string,
    init: K,
  ) {
    const name = typeof component === 'string' ? component : component.name;
    const instance = this.getComponentPool(name).get();

    instance.init(init);
    this.issuedComponents.add(instance);
    this.getComponentArray(name).insert(entity, instance);
  }

  remove<T extends Component<IComponent>>(
    entity: EntityId,
    component: ComponentConstructor<T> | string,
  ) {
    const name = typeof component === 'string' ? component : component.name;
    const pool = this.getComponentPool(name);
    const array = this.getComponentArray(name);
    const componentInstance = array.remove(entity);

    this.issuedComponents.delete(componentInstance);
    pool.put(componentInstance);
  }

  destroy(entity: EntityId) {
    for (const componentArrayEntry of this.componentArrays) {
      const componentName = componentArrayEntry[0];
      const componentArray = componentArrayEntry[1];

      if (componentArray.has(entity)) {
        this.remove(entity, componentName);
      }
    }
  }

  get<T extends Component<IComponent>>(
    entity: EntityId,
    component: ComponentConstructor<T> | string,
  ) {
    const name = typeof component === 'string' ? component : component.name;
    const array = this.getComponentArray(name);

    return array.get(entity);
  }

  has<T extends ECSComponent>(entity: EntityId, component: ComponentSignature) {
    const name = this.extractNameFromParameter(component);

    return this.getComponentArray(name).has(entity);
  }

  getComponentList() {
    return Array.from(this.signatureRegistry.entries());
  }

  getActiveComponents() {
    return Array.from(this.issuedComponents.values());
  }
}
