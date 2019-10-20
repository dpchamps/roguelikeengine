import { ComponentManager, ECSComponent } from './ComponentManager';
import { EntityManager } from './EntityManager';
import { System, SystemManager } from './SystemManager';
import { EntityId } from './ECSTypes';
import { IAssembly } from './Assembly';
import { Signature } from '../core/Signature';

export class ECS {
  private readonly componentManager: ComponentManager = new ComponentManager();
  private readonly entityManager: EntityManager = new EntityManager();
  private readonly systemManager: SystemManager = new SystemManager();
  private readonly assemblies: Map<string, IAssembly> = new Map();

  createEntity() {
    return this.entityManager.create();
  }

  destroyEntity(entity: EntityId) {
    this.entityManager.destroy(entity);
    this.componentManager.destroy(entity);
    this.systemManager.destroy(entity);
  }

  registerComponent<T extends ECSComponent>(component: new () => T) {
    this.componentManager.register(component);
  }

  addComponent<T extends ECSComponent, K>(entity: EntityId, component: new () => T, init?: K) {
    if (this.componentManager.has(entity, component)) {
      this.removeComponent(entity, component);
    }

    this.componentManager.add(entity, component, init);
    const signature = this.entityManager.getSignature(entity);

    signature.set(this.componentManager.getComponentId(component.name));

    this.entityManager.assignSignature(entity, signature);
    this.systemManager.updateEntitySignature(entity, signature);
  }

  removeComponent<T extends ECSComponent>(entity: EntityId, component: new () => T) {
    this.componentManager.remove(entity, component);

    const signature = this.entityManager.getSignature(entity);

    signature.unset(this.componentManager.getComponentId(component.name));

    this.entityManager.assignSignature(entity, signature);
    this.systemManager.updateEntitySignature(entity, signature);
  }

  getComponent<T extends ECSComponent>(entity: EntityId, component: new () => T): T {
    return <T>this.componentManager.get(entity, component);
  }

  hasComponent<T extends ECSComponent>(entity: EntityId, component: new () => T) {
    return this.componentManager.has(entity, component);
  }

  getComponentSignature<T extends ECSComponent>(component: new () => T) {
    return this.componentManager.getComponentSignature(component);
  }

  registerSystem<T extends System>(system: new (ecs: ECS) => T) {
    this.systemManager.register(system, this);

    // @ts-ignore
    if (system.components && Array.isArray(system.components)) {
      const signature = this.getSignatureFromComponents(
        // @ts-ignore
        ...system.components,
      );

      this.setSystemSignature(system, signature);
    }
  }

  getSystem<T extends System>(system: new (ecs: ECS) => T): T {
    if (!this.systemManager.systems.has(system.name)) {
      throw new TypeError(`Attempting to retrieve a system that doesn't exist`);
    }

    return <T>this.systemManager.systems.get(system.name)!;
  }

  setSystemSignature<T extends System>(system: new (ecs: ECS) => T, signature: Signature) {
    this.systemManager.setSignature(system, signature);
  }

  runSystems(deltaTime: number) {
    this.systemManager.run(deltaTime);
  }

  runSystemsLate(deltaTime: number) {
    this.systemManager.runLate(deltaTime);
  }

  getSignatureFromComponents(...components: Array<new () => ECSComponent>) {
    const signature = new Signature();

    components.forEach(component => {
      const componentSig = this.componentManager.getComponentSignature(component);
      signature.set(componentSig.signature);
    });

    return signature;
  }

  registerAssembly(assembly: IAssembly) {
    if (this.assemblies.has(assembly.name))
      throw new TypeError(
        `Assembly with name ${assembly.name} cannot be registered, because an assembly with that name already exists.`,
      );

    this.assemblies.set(assembly.name, assembly);
    if (assembly.immediate) {
      this.spawn(assembly.name);
    }
  }

  spawn(name: string) {
    if (!this.assemblies.has(name))
      throw new TypeError(`Cannot spawn assembly ${name} because it doesn't exist`);

    const entity = this.createEntity();
    const assembly = this.assemblies.get(name)!;

    assembly.components.forEach(assemblyComponent => {
      const component = this.componentManager.getComponentType(assemblyComponent.name);
      this.addComponent(entity, component, assemblyComponent.init);
    });

    this.systemManager.initialize(entity);

    return entity;
  }
}
