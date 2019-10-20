import { Loader } from 'pixi.js';
import { ecs } from './meta/ecs';

export class ResourceLoader {
  static async load(resources: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      resources.forEach(resource => Loader.shared.add(resource));
      Loader.shared.load();
      Loader.shared.on('complete', () => resolve());
      Loader.shared.on('error', reject);
    });
  }

  static registerAssemblies(assemblies: any[]) {
    assemblies.forEach(assembly => {
      try {
        ecs.registerAssembly(assembly);
      } catch (e) {
        console.error(`There was an error registering assembly ${assembly.name}`, e);
      }
    });
  }
}
