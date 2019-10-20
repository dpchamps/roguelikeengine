import { ResourceLoader } from '../src/ResourceLoader';
import { Engine } from '../src/Engine';
import resources from './resources.json';
import assemblies from './assemblies';

(async () => {
  await ResourceLoader.load(resources);
  ResourceLoader.registerAssemblies(assemblies);

  Engine.start();
  Engine.spawn('beekeeper');
})();
