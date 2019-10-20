import { readdirSync, writeFileSync } from 'fs';
import path from 'path';

const componentsPath = `src/core/components`;
const systemsPath = `src/core/systems`;
const metaPath = `src/meta`;
const importBase = path.relative(path.resolve(metaPath), './src');

const stripExtension = (x: string) => path.parse(x).name;
const generateModuleImport = (moduleName: string, path: string) =>
  `import { ${moduleName} } from '${importBase}/${path}'`;
const createCoreModuleImport = (component: string, corePath: string, filename: string) =>
  generateModuleImport(component, path.relative('src/', corePath) + '/' + filename);

(async () => {
  const components = readdirSync(componentsPath).map(stripExtension);
  const systems = readdirSync(systemsPath).map(stripExtension);
  const template = `
  ${generateModuleImport('ECS', 'ECS/ECS')}

  ${components
    .map(component => createCoreModuleImport(component, componentsPath, component))
    .join(';\n\t')}
  ${systems.map(system => createCoreModuleImport(system, systemsPath, system)).join(';\n\t')}
  
  
  export const ecs = (() => {
    try{
      const ecs = new ECS();
      
      ${components.map(component => 'ecs.registerComponent(' + component + ')').join(';\n\t')}
      ${systems.map(system => 'ecs.registerSystem(' + system + ')').join(';\n\t')}
     
      return ecs;   
    }catch(e){
      console.error('There was an error while wiring the ECS.', e);
    }
  })()!;
  `;

  console.log(`Writing template\n`, template);
  writeFileSync(metaPath + '/ecs.ts', template);
})();
